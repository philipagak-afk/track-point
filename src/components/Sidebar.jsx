
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Smartphone,
  Users,
  MapPin,
  Settings,
  Radio,
  ShieldCheck
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard
  },
  {
    name: "My Devices",
    path: "/devices",
    icon: Smartphone
  },
  {
    name: "Shared Devices",
    path: "/shared",
    icon: Users
  },
  {
    name: "Location History",
    path: "/history",
    icon: MapPin
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings
  }
];

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 p-5 text-white">

      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="rounded-xl bg-violet-600 p-2">
          <Radio size={24} />
        </div>

        <div>
          <h1 className="text-xl font-bold">TrackPoint</h1>
          <p className="text-xs text-slate-400">Device management</p>
        </div>
      </div>

      {/* Navigation */}
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
        Main Menu
      </p>

      <nav className="flex flex-1 flex-col gap-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Privacy information */}
      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <ShieldCheck className="mb-3 text-emerald-400" size={23} />

        <h3 className="mb-1 text-sm font-semibold">
          Your privacy matters
        </h3>

        <p className="text-xs leading-5 text-slate-400">
          Your devices only share their locations when you enable sharing.
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-slate-600">
        TrackPoint v1.0
      </p>

    </aside>
  );
}

export default Sidebar;
