"use client";

import { SocialMediaStats } from "@/lib/socialMediaAPI";

interface PerformanceMetricsProps {
  stats: SocialMediaStats[];
}

const platformIcons = {
  facebook: "📘",
  instagram: "📷",
  twitter: "🐦",
};

const platformColors = {
  facebook: "border-blue-500/30 bg-blue-500/10",
  instagram: "border-pink-500/30 bg-pink-500/10",
  twitter: "border-sky-500/30 bg-sky-500/10",
};

export default function PerformanceMetrics({ stats }: PerformanceMetricsProps) {
  const metrics = stats.map((stat) => {
    const engagementRate = stat.followers > 0 
      ? ((stat.engagement / stat.followers) * 100).toFixed(2)
      : "0";
    const reachRate = stat.followers > 0
      ? ((stat.reach / stat.followers) * 100).toFixed(2)
      : "0";
    
    return {
      platform: stat.platform,
      engagementRate: parseFloat(engagementRate),
      reachRate: parseFloat(reachRate),
      avgLikes: Math.floor(stat.likes / stat.posts) || 0,
      avgComments: Math.floor(stat.comments / stat.posts) || 0,
    };
  });

  const getRateColor = (rate: number, type: "engagement" | "reach") => {
    if (type === "engagement") {
      if (rate >= 50) return "text-green-400";
      if (rate >= 30) return "text-yellow-400";
      return "text-red-400";
    } else {
      if (rate >= 100) return "text-green-400";
      if (rate >= 70) return "text-yellow-400";
      return "text-blue-400";
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">⚡</span>
        <h3 className="text-lg font-semibold text-gray-100">Performance Metrics</h3>
      </div>
      <div className="space-y-4">
        {metrics.map((metric) => (
          <div
            key={metric.platform}
            className={`border rounded-lg p-4 ${platformColors[metric.platform as keyof typeof platformColors]} hover:border-opacity-50 transition-all`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{platformIcons[metric.platform as keyof typeof platformIcons]}</span>
              <h4 className="text-base font-semibold text-gray-100 capitalize">{metric.platform}</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-950/50 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💚</span>
                  <p className="text-xs text-gray-400">Engagement Rate</p>
                </div>
                <p className={`text-2xl font-bold ${getRateColor(metric.engagementRate, "engagement")}`}>
                  {metric.engagementRate}%
                </p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                    style={{ width: `${Math.min(metric.engagementRate, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">👁️</span>
                  <p className="text-xs text-gray-400">Reach Rate</p>
                </div>
                <p className={`text-2xl font-bold ${getRateColor(metric.reachRate, "reach")}`}>
                  {metric.reachRate}%
                </p>
                <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all"
                    style={{ width: `${Math.min(metric.reachRate, 200)}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">❤️</span>
                  <p className="text-xs text-gray-400">Avg Likes/Post</p>
                </div>
                <p className="text-2xl font-bold text-gray-100">{metric.avgLikes}</p>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(Math.min(Math.floor(metric.avgLikes / 5), 10))].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-950/50 rounded-lg p-3 border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💬</span>
                  <p className="text-xs text-gray-400">Avg Comments/Post</p>
                </div>
                <p className="text-2xl font-bold text-gray-100">{metric.avgComments}</p>
                <div className="mt-2 flex items-center gap-1">
                  {[...Array(Math.min(Math.floor(metric.avgComments / 2), 10))].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

