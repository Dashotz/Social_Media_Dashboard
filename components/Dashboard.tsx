"use client";

import { useEffect, useState } from "react";
import StatsOverview from "./StatsOverview";
import AnalyticsCharts from "./AnalyticsCharts";
import RecentPosts from "./RecentPosts";
import PostScheduler from "./PostScheduler";
import Sidebar from "./Sidebar";
import QuickStats from "./QuickStats";
import TopPosts from "./TopPosts";
import ActivityFeed from "./ActivityFeed";
import PerformanceMetrics from "./PerformanceMetrics";
import Insights from "./Insights";
import { SocialMediaStats, Post } from "@/lib/socialMediaAPI";
import { clientRateLimit } from "@/lib/clientSecurity";

export default function Dashboard() {
  const [stats, setStats] = useState<SocialMediaStats[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Client-side rate limiting
      if (!clientRateLimit('dashboard_fetch', 10, 30000)) {
        setError("Too many requests. Please wait a moment.");
        setLoading(false);
        return;
      }

      // For GitHub Pages (static hosting), fetch data directly from the API service
      const { fetchAllStats, fetchRecentPosts } = await import("@/lib/socialMediaAPI");
      
      const [statsData, postsData] = await Promise.all([
        fetchAllStats(),
        fetchRecentPosts(),
      ]);

      setStats(statsData);
      setPosts(postsData);
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-silver mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="bg-gray-900 border border-gray-800 text-gray-100 px-4 py-2 rounded-lg"
        >
          {[
            { id: "overview", label: "Overview" },
            { id: "analytics", label: "Analytics" },
            { id: "posts", label: "Posts" },
            { id: "schedule", label: "Schedule" },
            { id: "performance", label: "Performance" },
            { id: "insights", label: "Insights" },
          ].map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 max-w-full overflow-x-hidden">
        {/* Header */}
        <header className="bg-black border-b border-gray-800 shadow-lg shadow-silver/5 sticky top-0 z-10">
          <div className="px-4 lg:px-6 py-4">
            <h1 className="text-xl lg:text-2xl font-bold text-gray-100">Social Media Dashboard</h1>
            <p className="mt-1 text-xs lg:text-sm text-gray-400">Manage your social media accounts and analytics</p>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 lg:p-6">
          {error && (
            <div className="mb-6 bg-red-900/20 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <QuickStats stats={stats} />
              <StatsOverview stats={stats} loading={loading} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopPosts posts={posts} />
                <ActivityFeed posts={posts} />
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <AnalyticsCharts stats={stats} />
              <PerformanceMetrics stats={stats} />
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === "posts" && (
            <div className="space-y-6">
              <RecentPosts posts={posts} onRefresh={fetchData} />
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <div>
              <PostScheduler onSchedule={fetchData} />
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === "performance" && (
            <div className="space-y-6">
              <PerformanceMetrics stats={stats} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopPosts posts={posts} />
                <ActivityFeed posts={posts} />
              </div>
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === "insights" && (
            <div className="space-y-6">
              <Insights stats={stats} posts={posts} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopPosts posts={posts} />
                <ActivityFeed posts={posts} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

