"use client";

import { SocialMediaStats } from "@/lib/socialMediaAPI";

interface QuickStatsProps {
  stats: SocialMediaStats[];
}

export default function QuickStats({ stats }: QuickStatsProps) {
  const totalFollowers = stats.reduce((sum, s) => sum + s.followers, 0);
  const totalEngagement = stats.reduce((sum, s) => sum + s.engagement, 0);
  const totalReach = stats.reduce((sum, s) => sum + s.reach, 0);
  const avgGrowth = stats.length > 0 
    ? (stats.reduce((sum, s) => sum + s.growth, 0) / stats.length).toFixed(2)
    : "0";

  const quickStats = [
    { label: "Total Followers", value: totalFollowers.toLocaleString(), icon: "👥", color: "text-blue-400" },
    { label: "Total Engagement", value: totalEngagement.toLocaleString(), icon: "❤️", color: "text-pink-400" },
    { label: "Total Reach", value: totalReach.toLocaleString(), icon: "👁️", color: "text-green-400" },
    { label: "Avg Growth", value: `${avgGrowth}%`, icon: "📈", color: "text-yellow-400" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-silver/30 transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{stat.icon}</span>
            <span className={`text-xs font-semibold ${stat.color}`}>+</span>
          </div>
          <p className="text-2xl font-bold text-gray-100">{stat.value}</p>
          <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

