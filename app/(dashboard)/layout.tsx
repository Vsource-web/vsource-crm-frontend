// app/(dashboard)/layout.tsx

"use client";

import { Sidebar } from "./layouts/Sidebar";
import { Topbar } from "./layouts/Topbar";
import { useUi } from "@/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useUi();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-[72px]" : "md:ml-[252px]"
        }`}
      >
        <Topbar />

        <main className="min-h-[calc(100vh-64px)] overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
