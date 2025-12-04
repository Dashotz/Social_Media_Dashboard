/**
 * Social Media API Service
 * Handles fetching data from Facebook, Instagram, and Twitter APIs
 */

import type { Platform } from "./constants";

export interface SocialMediaStats {
  platform: Platform;
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
  likes: number;
  comments: number;
  shares: number;
  posts: number;
  growth: number; // percentage
  timestamp: string;
}

export interface Post {
  id: string;
  platform: Platform;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  scheduled?: boolean;
  scheduledTime?: string;
}

/**
 * Mock data generator for development
 * In production, replace with actual API calls
 */
export async function fetchFacebookStats(): Promise<SocialMediaStats> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const baseFollowers = 12500;
  const variation = Math.floor(Math.random() * 200) - 100;

  return {
    platform: "facebook",
    followers: baseFollowers + variation,
    engagement: Math.floor(Math.random() * 5000) + 2000,
    reach: Math.floor(Math.random() * 15000) + 8000,
    impressions: Math.floor(Math.random() * 20000) + 12000,
    likes: Math.floor(Math.random() * 800) + 300,
    comments: Math.floor(Math.random() * 200) + 50,
    shares: Math.floor(Math.random() * 150) + 30,
    posts: 45,
    growth: parseFloat((Math.random() * 5 + 2).toFixed(2)),
    timestamp: new Date().toISOString(),
  };
}

export async function fetchInstagramStats(): Promise<SocialMediaStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const baseFollowers = 18500;
  const variation = Math.floor(Math.random() * 300) - 150;

  return {
    platform: "instagram",
    followers: baseFollowers + variation,
    engagement: Math.floor(Math.random() * 8000) + 4000,
    reach: Math.floor(Math.random() * 25000) + 15000,
    impressions: Math.floor(Math.random() * 30000) + 20000,
    likes: Math.floor(Math.random() * 1200) + 500,
    comments: Math.floor(Math.random() * 300) + 100,
    shares: Math.floor(Math.random() * 200) + 50,
    posts: 68,
    growth: parseFloat((Math.random() * 6 + 3).toFixed(2)),
    timestamp: new Date().toISOString(),
  };
}

export async function fetchTwitterStats(): Promise<SocialMediaStats> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const baseFollowers = 9800;
  const variation = Math.floor(Math.random() * 150) - 75;

  return {
    platform: "twitter",
    followers: baseFollowers + variation,
    engagement: Math.floor(Math.random() * 3000) + 1500,
    reach: Math.floor(Math.random() * 12000) + 7000,
    impressions: Math.floor(Math.random() * 18000) + 10000,
    likes: Math.floor(Math.random() * 600) + 200,
    comments: Math.floor(Math.random() * 150) + 40,
    shares: Math.floor(Math.random() * 100) + 20,
    posts: 32,
    growth: parseFloat((Math.random() * 4 + 1.5).toFixed(2)),
    timestamp: new Date().toISOString(),
  };
}

export async function fetchAllStats(): Promise<SocialMediaStats[]> {
  const [facebook, instagram, twitter] = await Promise.all([
    fetchFacebookStats(),
    fetchInstagramStats(),
    fetchTwitterStats(),
  ]);

  return [facebook, instagram, twitter];
}

export async function fetchRecentPosts(platform?: Platform): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const platforms: Platform[] = platform
    ? [platform]
    : ["facebook", "instagram", "twitter"];

  const posts: Post[] = [];

  platforms.forEach((p) => {
    for (let i = 0; i < 5; i++) {
      posts.push({
        id: `${p}-${i}-${Date.now()}`,
        platform: p,
        content: `Sample post content from ${p} - ${i + 1}`,
        imageUrl: `https://picsum.photos/400/300?random=${i}`,
        likes: Math.floor(Math.random() * 500) + 50,
        comments: Math.floor(Math.random() * 100) + 10,
        shares: Math.floor(Math.random() * 50) + 5,
        timestamp: new Date(Date.now() - i * 3600000).toISOString(),
        scheduled: Math.random() > 0.7,
        scheduledTime: Math.random() > 0.7
          ? new Date(Date.now() + Math.random() * 7 * 24 * 3600000).toISOString()
          : undefined,
      });
    }
  });

  return posts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

