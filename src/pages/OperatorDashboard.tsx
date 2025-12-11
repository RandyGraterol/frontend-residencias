import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { operatorSidebarItems } from "@/config/sidebarConfig";

// Operator sections - Puede aprobar/rechazar pero NO crear/eliminar
import HomeSection from "@/components/dashboard/operator/HomeSection";
import TasksSection from "@/components/dashboard/operator/TasksSection";
import VerificationsSection from "@/components/dashboard/operator/VerificationsSection";
import ContentReviewSection from "@/components/dashboard/operator/ContentReviewSection";
import SupportSection from "@/components/dashboard/operator/SupportSection";
import SettingsSection from "@/components/dashboard/shared/SettingsSection";

// Placeholder sections
const PlaceholderSection = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
    <p className="text-muted-foreground">Sección "{title}" en desarrollo</p>
  </div>
);

// Panel Operador: Tareas delegadas por admin, puede aprobar pero NO crear/eliminar
const OperatorDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />;
      case "tasks":
        return <TasksSection />;
      case "verifications":
        return <VerificationsSection />;
      case "reviews":
        return <ContentReviewSection />;
      case "support":
        return <SupportSection />;
      case "reports":
        return <PlaceholderSection title="Reportes de Usuarios" />;
      case "properties-review":
        return <ContentReviewSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <DashboardLayout
      sidebarItems={operatorSidebarItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      role="operator"
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default OperatorDashboard;
