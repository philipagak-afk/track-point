
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default DashboardLayout;
