import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, Menu, ChevronLeft, ChevronRight, User, Shield, UserCog, Building, GraduationCap } from "lucide-react";
import { useState } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

export type UserRole = "client" | "tenant" | "operator" | "owner" | "propietario" | "admin";

interface SidebarProps {
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (itemId: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  title?: string;
  role?: UserRole;
}

const getRoleConfig = (role: UserRole) => {
  const configs: Record<UserRole, { label: string; icon: LucideIcon; color: string }> = {
    client: { label: "Estudiante", icon: GraduationCap, color: "bg-blue-100 text-blue-800" },
    tenant: { label: "Estudiante", icon: GraduationCap, color: "bg-blue-100 text-blue-800" },
    operator: { label: "Operador", icon: UserCog, color: "bg-purple-100 text-purple-800" },
    owner: { label: "Propietario", icon: Building, color: "bg-green-100 text-green-800" },
    propietario: { label: "Propietario", icon: Building, color: "bg-green-100 text-green-800" },
    admin: { label: "Administrador", icon: Shield, color: "bg-red-100 text-red-800" },
  };
  return configs[role] || configs.client;
};

const Sidebar = ({
  items,
  activeItem,
  onItemClick,
  collapsed = false,
  onToggleCollapse,
  title = "Panel",
  role = "client",
}: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const roleConfig = getRoleConfig(role);
  const RoleIcon = roleConfig.icon;

  const handleItemClick = (itemId: string) => {
    onItemClick(itemId);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header con título y tipo de usuario */}
      <div className={cn(
        "border-b",
        collapsed ? "px-2 py-3" : "px-4 py-3"
      )}>
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <span className="font-semibold text-lg">{title}</span>
          )}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="h-8 w-8"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        {/* Badge de tipo de usuario */}
        {!collapsed && (
          <div className="mt-2">
            <Badge className={cn("gap-1.5", roleConfig.color)}>
              <RoleIcon className="h-3 w-3" />
              {roleConfig.label}
            </Badge>
          </div>
        )}
        {collapsed && (
          <div className="mt-2 flex justify-center" title={roleConfig.label}>
            <RoleIcon className={cn("h-5 w-5", roleConfig.color.split(" ")[1])} />
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <ScrollArea className="flex-1 py-4">
        <nav className="flex flex-col gap-1 px-2">
          {items.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "text-muted-foreground",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary-foreground")} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className={cn(
                        "flex h-5 min-w-5 items-center justify-center rounded-full text-xs font-medium px-1.5",
                        isActive
                          ? "bg-primary-foreground text-primary"
                          : "bg-primary text-primary-foreground"
                      )}>
                        {item.badge > 99 ? "99+" : item.badge}
                      </span>
                    )}
                  </>
                )}
                {collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs px-1">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r bg-background transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="md:hidden fixed bottom-4 left-4 z-40">
          <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
