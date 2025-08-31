import { Outlet } from "react-router";

export default function MobileLayout() {
  return (
    <div className="md:hidden min-h-screen bg-background">
      <Outlet />
    </div>
  );
}
