"use client";

import { Post } from "@/lib/socialMediaAPI";
import { formatDistanceToNow } from "date-fns";
import { platformIcons } from "@/lib/constants";

interface ActivityFeedProps {
  posts: Post[];
}

const activityTypes = {
  like: "❤️",
  comment: "💬",
  share: "🔄",
  post: "📝",
};

export default function ActivityFeed({ posts }: ActivityFeedProps) {
  // Generate activity feed from posts - limit to 5 entries
  const activities = posts.slice(0, 8).flatMap((post) => [
    {
      id: `${post.id}-like`,
      type: "like",
      platform: post.platform,
      count: post.likes,
      timestamp: post.timestamp,
    },
    {
      id: `${post.id}-comment`,
      type: "comment",
      platform: post.platform,
      count: post.comments,
      timestamp: post.timestamp,
    },
  ]).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5); // Limit to 5 entries

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Recent Activity</h3>
      <div className="space-y-3 max-h-100 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {activities.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No activity</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 bg-gray-950/50 border border-gray-800 rounded-lg hover:border-silver/30 transition-all"
            >
              <span className="text-xl">{activityTypes[activity.type as keyof typeof activityTypes]}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-300">
                  {activity.count} {activity.type}s on {platformIcons[activity.platform]} {activity.platform}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

