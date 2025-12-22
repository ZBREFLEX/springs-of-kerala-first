import { useState } from "react";
import "./admin.css";
import AdminSidebar from "./AdminSidebar";
import DashboardHome from "./DashboardHome";
import GalleryManager from "./GalleryManager";
import VehicleManager from "./VehicleManager";

export default function AdminDashboard() {
  const [active, setActive] = useState("home");

  const renderContent = () => {
    if (active === "gallery") return <GalleryManager />;
    if (active === "vehicles") return <VehicleManager />;
    return <DashboardHome />;
  };

  return (
    <div className="admin-container">
      <AdminSidebar setActive={setActive} />
      <main className="admin-content">{renderContent()}</main>
    </div>
  );
}
