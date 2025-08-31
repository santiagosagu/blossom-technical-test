import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export default function DesktopLayout() {
  return (
    <div className="hidden md:flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto py-6 px-20">
        <Outlet />
      </div>
    </div>
  );
}
