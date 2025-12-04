"use client";

import { SocialMediaStats } from "@/lib/socialMediaAPI";
import { format } from "date-fns";

interface StatsOverviewProps {
  stats: SocialMediaStats[];
  loading: boolean;
}

const platformColors = {
  facebook: "bg-blue-500",
  instagram: "bg-pink-500",
  twitter: "bg-sky-500",
};

const platformNames = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
};

export default function StatsOverview({ stats, loading }: StatsOverviewProps) {
  if (loading && stats.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.platform}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {platformNames[stat.platform]}
            </h3>
            <div className={`w-3 h-3 rounded-full ${platformColors[stat.platform]}`}></div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Followers</p>
              <p className="text-2xl font-bold text-gray-900">
                {stat.followers.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 mt-1">
                +{stat.growth}% growth
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t">
              <div>
                <p className="text-xs text-gray-500">Engagement</p>
                <p className="text-lg font-semibold text-gray-900">
                  {stat.engagement.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Reach</p>
                <p className="text-lg font-semibold text-gray-900">
                  {stat.reach.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-gray-400">
              Updated: {format(new Date(stat.timestamp), "MMM d, HH:mm")}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

