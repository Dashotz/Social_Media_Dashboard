"use client";

import { Post } from "@/lib/socialMediaAPI";
import { format, formatDistanceToNow } from "date-fns";

interface RecentPostsProps {
  posts: Post[];
  onRefresh: () => void;
}

const platformColors = {
  facebook: "bg-blue-100 text-blue-800",
  instagram: "bg-pink-100 text-pink-800",
  twitter: "bg-sky-100 text-sky-800",
};

const platformIcons = {
  facebook: "📘",
  instagram: "📷",
  twitter: "🐦",
};

export default function RecentPosts({ posts, onRefresh }: RecentPostsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Posts</h2>
        <button
          onClick={onRefresh}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No posts available</p>
        ) : (
          posts.slice(0, 10).map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{platformIcons[post.platform]}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${platformColors[post.platform]}`}
                  >
                    {post.platform}
                  </span>
                  {post.scheduled && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Scheduled
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                </span>
              </div>

              {post.imageUrl && (
                <div className="mb-2 rounded-lg overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}

              <p className="text-sm text-gray-700 mb-3 line-clamp-2">{post.content}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
                <span>🔄 {post.shares}</span>
              </div>

              {post.scheduledTime && (
                <div className="mt-2 text-xs text-gray-500">
                  Scheduled for: {format(new Date(post.scheduledTime), "MMM d, yyyy 'at' HH:mm")}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

