"use client";

import { useState } from "react";
import { format } from "date-fns";
import { platformIcons, platformBadgeColors, type Platform } from "@/lib/constants";

interface PostSchedulerProps {
  onSchedule: () => void;
}

export default function PostScheduler({ onSchedule }: PostSchedulerProps) {
  const [platform, setPlatform] = useState<Platform>("facebook");
  const [content, setContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform,
          content,
          scheduledTime,
          imageUrl: imageUrl || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to schedule post");
      }

      setMessage({ type: "success", text: "Post scheduled successfully!" });
      setContent("");
      setScheduledTime("");
      setImageUrl("");
      onSchedule();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to schedule post",
      });
    } finally {
      setLoading(false);
    }
  };

  // Set default scheduled time to tomorrow at 9 AM
  const getDefaultScheduledTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  };


  const quickTimePresets = [
    { label: "In 1 hour", hours: 1 },
    { label: "In 3 hours", hours: 3 },
    { label: "Tomorrow 9 AM", hours: 24, setHour: 9 },
    { label: "Tomorrow 2 PM", hours: 24, setHour: 14 },
  ];

  const setQuickTime = (preset: typeof quickTimePresets[0]) => {
    const date = new Date();
    if (preset.setHour !== undefined) {
      date.setDate(date.getDate() + Math.floor(preset.hours / 24));
      date.setHours(preset.setHour, 0, 0, 0);
    } else {
      date.setHours(date.getHours() + preset.hours);
    }
    setScheduledTime(date.toISOString().slice(0, 16));
  };

  const bestPostingTimes = {
    facebook: "Best times: 9 AM - 3 PM on weekdays",
    instagram: "Best times: 11 AM - 1 PM, 7 PM - 9 PM",
    twitter: "Best times: 8 AM - 9 AM, 12 PM - 1 PM",
  };

  const characterLimit = {
    facebook: 5000,
    instagram: 2200,
    twitter: 280,
  };

  const currentLimit = characterLimit[platform];

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📅</span>
          <h2 className="text-xl font-bold text-gray-100">Schedule Post</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2.5">
            <span className="flex items-center gap-2">
              <span>🌐</span>
              Platform
            </span>
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-silver focus:border-silver transition-all hover:border-gray-600"
            required
          >
            <option value="facebook">📘 Facebook</option>
            <option value="instagram">📷 Instagram</option>
            <option value="twitter">🐦 Twitter</option>
          </select>
        </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <span>✍️</span>
                    Content
                  </span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => {
                    const newContent = e.target.value;
                    if (newContent.length <= currentLimit) {
                      setContent(newContent);
                    }
                  }}
                  rows={6}
                  maxLength={currentLimit}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-silver focus:border-silver transition-all placeholder-gray-500 resize-none hover:border-gray-600"
                  placeholder="What's on your mind?"
                  required
                />
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">
                      {content.length > 0 ? (
                        <span className={content.length > currentLimit * 0.9 ? "text-yellow-400" : "text-gray-400"}>
                          {content.length}/{currentLimit} characters
                        </span>
                      ) : (
                        "Enter your post content"
                      )}
                    </p>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        content.length > currentLimit * 0.9
                          ? "bg-yellow-500"
                          : content.length > currentLimit * 0.7
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${(content.length / currentLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Scheduled Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <span>⏰</span>
                    Scheduled Time
                  </span>
                </label>
                <input
                  type="datetime-local"
                  value={scheduledTime || getDefaultScheduledTime()}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-silver focus:border-silver transition-all hover:border-gray-600 mb-2"
                  required
                />
                <div className="flex flex-wrap gap-2">
                  {quickTimePresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setQuickTime(preset)}
                      className="px-3 py-1.5 text-xs font-medium bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-750 hover:border-silver/50 transition-all"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 {bestPostingTimes[platform]}
                </p>
              </div>

              {/* Image URL (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2.5">
                  <span className="flex items-center gap-2">
                    <span>🖼️</span>
                    Image URL <span className="text-xs font-normal text-gray-500">(Optional)</span>
                  </span>
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-silver focus:border-silver transition-all placeholder-gray-500 hover:border-gray-600"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`p-4 rounded-lg border ${
                    message.type === "success"
                      ? "bg-green-900/30 text-green-400 border-green-800/50"
                      : "bg-red-900/30 text-red-400 border-red-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{message.type === "success" ? "✅" : "❌"}</span>
                    <span className="font-medium">{message.text}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 border-2 border-silver focus:outline-none focus:ring-2 focus:ring-silver focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-silver/20 hover:shadow-xl hover:shadow-silver/30"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Scheduling...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>📤</span>
                    Schedule Post
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Preview & Tips */}
          <div className="space-y-5">
            {/* Post Preview */}
            <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <span>👁️</span>
                Post Preview
              </h3>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{platformIcons[platform]}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${platformBadgeColors[platform]}`}>
                    {platform}
                  </span>
                </div>
                {imageUrl && (
                  <div className="mb-3 rounded-lg overflow-hidden border border-gray-800">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
                <p className="text-sm text-gray-300 mb-3 whitespace-pre-wrap break-words">
                  {content || "Your post content will appear here..."}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-800">
                  <span>❤️ 0</span>
                  <span>💬 0</span>
                  <span>🔄 0</span>
                </div>
                {scheduledTime && (
                  <p className="text-xs text-gray-500 mt-2">
                    Scheduled: {format(new Date(scheduledTime), "MMM d, yyyy 'at' HH:mm")}
                  </p>
                )}
              </div>
            </div>

            {/* Platform Tips */}
            <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <span>💡</span>
                Tips for {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                {platform === "facebook" && (
                  <>
                    <li>• Use engaging visuals to increase reach</li>
                    <li>• Post during peak hours (9 AM - 3 PM)</li>
                    <li>• Ask questions to encourage comments</li>
                    <li>• Keep posts concise and clear</li>
                  </>
                )}
                {platform === "instagram" && (
                  <>
                    <li>• Use high-quality images (1080x1080)</li>
                    <li>• Post 1-3 times per day for best results</li>
                    <li>• Use relevant hashtags (5-10)</li>
                    <li>• Engage with comments quickly</li>
                  </>
                )}
                {platform === "twitter" && (
                  <>
                    <li>• Keep tweets under 280 characters</li>
                    <li>• Use trending hashtags when relevant</li>
                    <li>• Post multiple times per day</li>
                    <li>• Include images or GIFs for engagement</li>
                  </>
                )}
              </ul>
            </div>

            {/* Character Limits Info */}
            <div className="bg-gray-950/50 border border-gray-800 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <span>📏</span>
                Character Limits
              </h3>
              <div className="space-y-2">
                {Object.entries(characterLimit).map(([plat, limit]) => (
                  <div
                    key={plat}
                    className={`flex items-center justify-between p-2 rounded ${
                      plat === platform ? "bg-gray-800" : "bg-gray-900/50"
                    }`}
                  >
                    <span className="text-xs text-gray-400 capitalize">{plat}</span>
                    <span className="text-xs font-semibold text-gray-300">{limit.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

