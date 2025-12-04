"use client";

import { Post } from "@/lib/socialMediaAPI";
import { format, formatDistanceToNow } from "date-fns";

interface RecentPostsProps {
  posts: Post[];
  onRefresh: () => void;
}

const platformColors = {
  facebook: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  instagram: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  twitter: "bg-sky-500/20 text-sky-400 border-sky-500/30",
};

const platformIcons = {
  facebook: "📘",
  instagram: "📷",
  twitter: "🐦",
};

export default function RecentPosts({ posts, onRefresh }: RecentPostsProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-100">Recent Posts</h2>
        <button
          onClick={onRefresh}
          className="text-sm text-silver hover:text-gray-200 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {posts.length === 0 ? (
          <div className="col-span-full">
            <p className="text-gray-400 text-center py-12">No posts available</p>
          </div>
        ) : (
          posts.slice(0, 10).map((post) => (
            <div
              key={post.id}
              className="border border-gray-800 rounded-lg p-4 hover:border-silver/40 hover:shadow-lg hover:shadow-silver/5 transition-all bg-gray-950/50 flex flex-col"
            >
              {/* Header with platform and time */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-lg">{platformIcons[post.platform]}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${platformColors[post.platform]}`}
                  >
                    {post.platform}
                  </span>
                </div>
              </div>

              {/* Image - Square/Box format */}
              {post.imageUrl && (
                <div className="mb-3 rounded-lg overflow-hidden border border-gray-800/50 aspect-square">
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <p className="text-xs text-gray-300 mb-3 line-clamp-2 leading-relaxed flex-1">
                {post.content}
              </p>

              {/* Engagement metrics */}
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="text-sm">❤️</span>
                  <span className="text-xs font-semibold text-gray-200">{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">💬</span>
                  <span className="text-xs font-semibold text-gray-200">{post.comments.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">🔄</span>
                  <span className="text-xs font-semibold text-gray-200">{post.shares.toLocaleString()}</span>
                </div>
              </div>

              {/* Time and Scheduled badge */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
                </span>
                {post.scheduled && (
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-yellow-900/40 text-yellow-300 border border-yellow-700/50">
                    Scheduled
                  </span>
                )}
              </div>

              {/* Scheduled time */}
              {post.scheduledTime && (
                <div className="mt-2 pt-2 border-t border-gray-800">
                  <p className="text-xs text-gray-500">
                    <span className="text-gray-400">Scheduled:</span>{" "}
                    {format(new Date(post.scheduledTime), "MMM d, HH:mm")}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

