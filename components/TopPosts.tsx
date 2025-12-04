"use client";

import { Post } from "@/lib/socialMediaAPI";
import { platformIcons } from "@/lib/constants";

interface TopPostsProps {
  posts: Post[];
}

export default function TopPosts({ posts }: TopPostsProps) {
  // Sort by total engagement (likes + comments + shares)
  const topPosts = [...posts]
    .sort((a, b) => (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares))
    .slice(0, 5);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Top Performing Posts</h3>
      <div className="space-y-3">
        {topPosts.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No posts available</p>
        ) : (
          topPosts.map((post, index) => {
            const totalEngagement = post.likes + post.comments + post.shares;
            return (
              <div
                key={post.id}
                className="flex items-center gap-4 p-3 bg-gray-950/50 border border-gray-800 rounded-lg hover:border-silver/30 transition-all"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold text-silver">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{platformIcons[post.platform]}</span>
                    <span className="text-xs text-gray-400 capitalize">{post.platform}</span>
                  </div>
                  <p className="text-sm text-gray-300 truncate">{post.content}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-sm font-semibold text-gray-100">{totalEngagement.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Engagement</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

