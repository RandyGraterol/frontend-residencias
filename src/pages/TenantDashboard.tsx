import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { clientSidebarItems } from "@/config/sidebarConfig";

// Client sections - Solo lectura, sin CRUD
import HomeSection from "@/components/dashboard/tenant/HomeSection";
import DiscoverSection from "@/components/dashboard/tenant/DiscoverSection";
import FavoritesSection from "@/components/dashboard/tenant/FavoritesSection";
import RequestsSection from "@/components/dashboard/tenant/RequestsSection";
import MessagesSection from "@/components/dashboard/shared/MessagesSection";
import SettingsSection from "@/components/dashboard/shared/SettingsSection";

// Placeholder sections
const PlaceholderSection = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
    <p className="text-muted-foreground">Sección "{title}" en desarrollo</p>
  </div>
);

// Panel Cliente/Estudiante: Solo puede consumir información
const TenantDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />;
      case "discover":
        return <DiscoverSection />;
      case "favorites":
        return <FavoritesSection />;
      case "requests":
        return <RequestsSection />;
      case "messages":
        return <MessagesSection />;
      case "notifications":
        return <PlaceholderSection title="Notificaciones" />;
      case "help":
        return <PlaceholderSection title="Ayuda" />;
      case "settings":
        return <SettingsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <DashboardLayout
      sidebarItems={clientSidebarItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      role="client"
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default TenantDashboard;
