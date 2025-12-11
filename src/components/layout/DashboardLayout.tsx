import { useState, ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar, { SidebarItem, UserRole } from "./Sidebar";
import { cn } from "@/lib/utils";
import { 
  getTitleByRole, 
  getPermissionsByRole, 
  RolePermissions 
} from "@/config/sidebarConfig";

export type { UserRole };

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  title?: string;
  role?: UserRole;
}

const DashboardLayout = ({
  children,
  sidebarItems,
  activeSection,
  onSectionChange,
  title,
  role = "client",
}: DashboardLayoutProps) => {
  // Obtener título y permisos según el rol
  const dashboardTitle = title || getTitleByRole(role);
  const permissions: RolePermissions = getPermissionsByRole(role);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <Navbar variant="dashboard" />

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Sidebar */}
        <Sidebar
          items={sidebarItems}
          activeItem={activeSection}
          onItemClick={onSectionChange}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={dashboardTitle}
          role={role}
        />

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 overflow-auto transition-all duration-300",
            "p-6 md:p-8"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
