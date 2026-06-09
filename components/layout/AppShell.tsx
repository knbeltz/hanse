import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";
import UserSync from "@/components/providers/UserSync";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-hanse-bg">
      <UserSync />
      <TopNav />
      <div className="flex flex-1">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>
        <main className="flex-1 min-w-0 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
