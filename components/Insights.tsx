"use client";

import { SocialMediaStats, Post } from "@/lib/socialMediaAPI";

interface InsightsProps {
  stats: SocialMediaStats[];
  posts: Post[];
}

export default function Insights({ stats, posts }: InsightsProps) {
  const totalFollowers = stats.reduce((sum, s) => sum + s.followers, 0);
  const bestPlatform = stats.reduce((best, current) => 
    current.followers > best.followers ? current : best
  );
  const mostEngagedPost = posts.reduce((best, current) => {
    const currentEngagement = current.likes + current.comments + current.shares;
    const bestEngagement = best.likes + best.comments + best.shares;
    return currentEngagement > bestEngagement ? current : best;
  }, posts[0] || { likes: 0, comments: 0, shares: 0 });

  const insights = [
    {
      title: "Best Performing Platform",
      value: bestPlatform.platform.charAt(0).toUpperCase() + bestPlatform.platform.slice(1),
      description: `${bestPlatform.followers.toLocaleString()} followers`,
      icon: "🏆",
    },
    {
      title: "Total Audience",
      value: totalFollowers.toLocaleString(),
      description: "Across all platforms",
      icon: "👥",
    },
    {
      title: "Growth Trend",
      value: "+" + stats.reduce((sum, s) => sum + s.growth, 0).toFixed(1) + "%",
      description: "Average growth rate",
      icon: "📈",
    },
    {
      title: "Peak Engagement",
      value: (mostEngagedPost.likes + mostEngagedPost.comments + mostEngagedPost.shares).toLocaleString(),
      description: "Best post performance",
      icon: "⭐",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-silver/30 transition-all"
        >
          <div className="flex items-start justify-between mb-2">
            <span className="text-2xl">{insight.icon}</span>
          </div>
          <h4 className="text-sm font-semibold text-gray-300 mb-1">{insight.title}</h4>
          <p className="text-2xl font-bold text-gray-100 mb-1">{insight.value}</p>
          <p className="text-xs text-gray-400">{insight.description}</p>
        </div>
      ))}
    </div>
  );
}

