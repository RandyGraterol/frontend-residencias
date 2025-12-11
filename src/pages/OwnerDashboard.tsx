import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ownerSidebarItems } from "@/config/sidebarConfig";

// Owner sections
import HomeSection from "@/components/dashboard/owner/HomeSection";
import PropertiesSection from "@/components/dashboard/owner/PropertiesSection";
import ReceivedRequestsSection from "@/components/dashboard/owner/ReceivedRequestsSection";
import StatsSection from "@/components/dashboard/owner/StatsSection";
import MessagesSection from "@/components/dashboard/shared/MessagesSection";
import SettingsSection from "@/components/dashboard/shared/SettingsSection";

const OwnerDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection />;
      case "properties":
        return <PropertiesSection />;
      case "requests":
        return <ReceivedRequestsSection />;
      case "messages":
        return <MessagesSection />;
      case "stats":
        return <StatsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <DashboardLayout
      sidebarItems={ownerSidebarItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      role="propietario"
    >
      {renderSection()}
    </DashboardLayout>
  );
};

export default OwnerDashboard;
