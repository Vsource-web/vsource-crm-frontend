// crm-frontend-next\app\(dashboard)\layout.tsx

import { Sidebar } from "./layouts/Sidebar";
import { Topbar } from "./layouts/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 min-w-0 flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
