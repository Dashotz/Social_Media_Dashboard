import { NextRequest, NextResponse } from "next/server";
import { fetchAllStats } from "@/lib/socialMediaAPI";
import { getClientIP, rateLimit, getSecurityHeaders } from "@/lib/security";

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

    // Fetch stats
    const stats = await fetchAllStats();

    return NextResponse.json(
      { data: stats, timestamp: new Date().toISOString() },
      { headers: getSecurityHeaders() }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

