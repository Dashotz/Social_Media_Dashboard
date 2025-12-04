"use client";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "posts", label: "Posts", icon: "📝" },
  { id: "schedule", label: "Schedule", icon: "📅" },
  { id: "performance", label: "Performance", icon: "⚡" },
  { id: "insights", label: "Insights", icon: "💡" },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="hidden lg:block w-64 bg-gray-900 border-r border-gray-800 h-screen fixed left-0 top-0 overflow-y-auto z-20">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-100 mb-6">Dashboard</h2>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-silver/20 text-silver border border-silver/30"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

