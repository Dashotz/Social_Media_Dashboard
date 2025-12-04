"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { SocialMediaStats } from "@/lib/socialMediaAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsChartsProps {
  stats: SocialMediaStats[];
}

export default function AnalyticsCharts({ stats }: AnalyticsChartsProps) {
  if (stats.length === 0) {
    return null;
  }

  // Followers over time (simulated data)
  const followersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: stats.map((stat) => ({
      label: stat.platform.charAt(0).toUpperCase() + stat.platform.slice(1),
      data: Array.from({ length: 6 }, (_, i) => {
        const base = stat.followers;
        const variation = (6 - i) * 100;
        return base - variation + Math.random() * 200;
      }),
      borderColor:
        stat.platform === "facebook"
          ? "#3b82f6"
          : stat.platform === "instagram"
          ? "#ec4899"
          : "#0ea5e9",
      backgroundColor:
        stat.platform === "facebook"
          ? "rgba(59, 130, 246, 0.1)"
          : stat.platform === "instagram"
          ? "rgba(236, 72, 153, 0.1)"
          : "rgba(14, 165, 233, 0.1)",
      tension: 0.4,
    })),
  };

  // Engagement comparison
  const engagementData = {
    labels: stats.map((s) => s.platform.charAt(0).toUpperCase() + s.platform.slice(1)),
    datasets: [
      {
        label: "Engagement",
        data: stats.map((s) => s.engagement),
        backgroundColor: ["#3b82f6", "#ec4899", "#0ea5e9"],
        borderRadius: 8,
      },
    ],
  };

  // Platform distribution
  const distributionData = {
    labels: stats.map((s) => s.platform.charAt(0).toUpperCase() + s.platform.slice(1)),
    datasets: [
      {
        data: stats.map((s) => s.followers),
        backgroundColor: ["#3b82f6", "#ec4899", "#0ea5e9"],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#c0c0c0",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "rgba(156, 163, 175, 0.1)",
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-100">Analytics</h2>

      {/* Followers Growth Chart - Full Width */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Followers Growth</h3>
        <div className="h-64">
          <Line data={followersData} options={chartOptions} />
        </div>
      </div>

      {/* Engagement Comparison and Platform Distribution - Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Comparison */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Engagement Comparison</h3>
          <div className="h-64">
            <Bar data={engagementData} options={chartOptions} />
          </div>
        </div>

        {/* Platform Distribution */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Platform Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="w-64 h-64">
              <Doughnut
                data={distributionData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      position: "bottom" as const,
                      labels: {
                        color: "#c0c0c0",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

