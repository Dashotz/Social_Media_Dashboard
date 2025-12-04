import { NextRequest, NextResponse } from "next/server";
import { fetchRecentPosts } from "@/lib/socialMediaAPI";
import { getClientIP, rateLimit, getSecurityHeaders } from "@/lib/security";
import type { Platform } from "@/lib/constants";

const VALID_PLATFORMS: Platform[] = ["facebook", "instagram", "twitter"];

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: getSecurityHeaders() }
      );
    }

    // Get platform filter from query params
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get("platform") as Platform | null;

    // Validate platform if provided
    if (platform && !VALID_PLATFORMS.includes(platform)) {
      return NextResponse.json(
        { error: "Invalid platform" },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    const posts = await fetchRecentPosts(platform || undefined);

    return NextResponse.json(
      { data: posts, timestamp: new Date().toISOString() },
      { headers: getSecurityHeaders() }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

