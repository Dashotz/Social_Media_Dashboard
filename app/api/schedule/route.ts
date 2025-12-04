import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getClientIP, rateLimit, getSecurityHeaders, sanitizeInput } from "@/lib/security";

const scheduleSchema = z.object({
  platform: z.enum(["facebook", "instagram", "twitter"]),
  content: z.string().min(1).max(2000),
  scheduledTime: z.string().datetime(),
  imageUrl: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: getSecurityHeaders() }
      );
    }

    const body = await request.json();

    // Validate input
    const validationResult = scheduleSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid input", details: validationResult.error.errors },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    const { platform, content, scheduledTime, imageUrl } = validationResult.data;

    // Sanitize content
    const sanitizedContent = sanitizeInput(content);

    // In production, save to database
    const scheduledPost = {
      id: `scheduled-${Date.now()}`,
      platform,
      content: sanitizedContent,
      imageUrl,
      scheduledTime,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { message: "Post scheduled successfully", data: scheduledPost },
      { status: 201, headers: getSecurityHeaders() }
    );
  } catch (error) {
    console.error("Error scheduling post:", error);
    return NextResponse.json(
      { error: "Failed to schedule post" },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

