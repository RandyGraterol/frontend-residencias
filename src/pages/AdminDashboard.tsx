import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { adminSidebarItems } from "@/config/sidebarConfig";

// Admin sections - CRUD completo en todas las secciones
import HomeSection from "@/components/dashboard/admin/HomeSection";
import UsersSection from "@/components/dashboard/admin/UsersSection";
import OperatorsSection from "@/components/dashboard/admin/OperatorsSection";
import PropertiesSection from "@/components/dashboard/admin/PropertiesSection";
import ReportsSection from "@/components/dashboard/admin/ReportsSection";
import KYCSection from "@/components/dashboard/admin/KYCSection";
import AnnouncementsSection from "@/components/dashboard/admin/AnnouncementsSection";
import SettingsSection from "@/components/dashboard/shared/SettingsSection";

// Placeholder sections
const PlaceholderSection = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
    <p className="text-muted-foreground">Sección "{title}" en desarrollo</p>
  </div>
);

// Panel Administrador: CRUD completo en todo el sistema
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />;
      case "users":
        return <UsersSection />;
      case "operators":
        return <OperatorsSection />;
      case "properties":
        return <PropertiesSection />;
      case "categories":
        return <PlaceholderSection title="Categorías y Tipos" />;
      case "kyc":
        return <KYCSection />;
      case "reports":
        return <ReportsSection />;
      case "announcements":
        return <AnnouncementsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      role="admin"
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default AdminDashboard;
