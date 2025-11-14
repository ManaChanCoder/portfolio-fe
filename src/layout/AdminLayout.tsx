import { Outlet } from "react-router-dom";
import DashSidebar from "../shared/components/DashSidebar";

export default function AdminLayout() {
  return (
    <div className="d-flex overflow-hidden" style={{ height: "100vh" }}>
      <DashSidebar />
      <Outlet />
    </div>
  );
}
