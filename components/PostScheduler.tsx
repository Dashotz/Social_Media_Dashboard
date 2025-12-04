"use client";

import { useState } from "react";

interface PostSchedulerProps {
  onSchedule: () => void;
}

export default function PostScheduler({ onSchedule }: PostSchedulerProps) {
  const [platform, setPlatform] = useState<"facebook" | "instagram" | "twitter">("facebook");
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

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-100 mb-4">Schedule Post</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as "facebook" | "instagram" | "twitter")}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-silver focus:border-silver transition-colors"
            required
          >
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            maxLength={2000}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-silver focus:border-silver transition-colors placeholder-gray-500"
            placeholder="What's on your mind?"
            required
          />
          <p className="text-xs text-gray-400 mt-1">{content.length}/2000 characters</p>
        </div>

        {/* Scheduled Time */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Scheduled Time
          </label>
          <input
            type="datetime-local"
            value={scheduledTime || getDefaultScheduledTime()}
            onChange={(e) => setScheduledTime(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-silver focus:border-silver transition-colors"
            required
          />
        </div>

        {/* Image URL (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Image URL (Optional)
          </label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-gray-100 rounded-lg focus:ring-2 focus:ring-silver focus:border-silver transition-colors placeholder-gray-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-3 rounded-lg ${
              message.type === "success"
                ? "bg-green-900/30 text-green-400 border border-green-800/50"
                : "bg-red-900/30 text-red-400 border border-red-800/50"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-2 px-4 rounded-lg font-medium hover:bg-gray-200 border-2 border-silver focus:outline-none focus:ring-2 focus:ring-silver focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-silver/20"
        >
          {loading ? "Scheduling..." : "Schedule Post"}
        </button>
      </form>
    </div>
  );
}

