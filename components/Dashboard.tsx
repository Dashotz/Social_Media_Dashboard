"use client";

import { useEffect, useState } from "react";
import StatsOverview from "./StatsOverview";
import AnalyticsCharts from "./AnalyticsCharts";
import RecentPosts from "./RecentPosts";
import PostScheduler from "./PostScheduler";
import { SocialMediaStats, Post } from "@/lib/socialMediaAPI";

export default function Dashboard() {
  const [stats, setStats] = useState<SocialMediaStats[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsRes, postsRes] = await Promise.all([
        fetch("/api/stats"),
        fetch("/api/posts"),
      ]);

      if (!statsRes.ok || !postsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const statsData = await statsRes.json();
      const postsData = await postsRes.json();

      setStats(statsData.data);
      setPosts(postsData.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Refresh data every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading && stats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Social Media Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your social media accounts and analytics</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats Overview */}
        <StatsOverview stats={stats} loading={loading} />

        {/* Analytics Charts */}
        <div className="mt-8">
          <AnalyticsCharts stats={stats} />
        </div>

        {/* Recent Posts and Scheduler */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentPosts posts={posts} onRefresh={fetchData} />
          <PostScheduler onSchedule={fetchData} />
        </div>
      </main>
    </div>
  );
}

