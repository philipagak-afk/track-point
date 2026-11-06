
import {
  Smartphone,
  Wifi,
  WifiOff,
  Users
} from "lucide-react";

import StatCard from "../components/StatCard";
import DeviceCard from "../components/DeviceCard";

const devices = [
  {
    id: 1,
    name: "Personal Phone",
    type: "Smartphone",
    status: "Online",
    location: "Location not connected",
    lastUpdated: "Sample device"
  },
  {
    id: 2,
    name: "Work Laptop",
    type: "Laptop",
    status: "Online",
    location: "Location not connected",
    lastUpdated: "Sample device"
  },
  {
    id: 3,
    name: "Backup Phone",
    type: "Smartphone",
    status: "Offline",
    location: "Last location unavailable",
    lastUpdated: "No recent update"
  }
];

function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Manage your devices and location sharing.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Devices"
          value="3"
          description="Registered devices"
          icon={Smartphone}
          color="bg-violet-500/10 text-violet-400"
        />

        <StatCard
          title="Online Devices"
          value="2"
          description="Sample device status"
          icon={Wifi}
          color="bg-emerald-500/10 text-emerald-400"
        />

        <StatCard
          title="Offline Devices"
          value="1"
          description="Sample device status"
          icon={WifiOff}
          color="bg-orange-500/10 text-orange-400"
        />

        <StatCard
          title="Shared Devices"
          value="0"
          description="Devices shared with you"
          icon={Users}
          color="bg-blue-500/10 text-blue-400"
        />

      </div>

      {/* Map section */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Device Locations
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your shared device locations will appear here.
          </p>
        </div>

        <div className="flex h-72 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950">

          <div className="rounded-full bg-violet-500/10 p-4 text-violet-400">
            <Smartphone size={32} />
          </div>

          <h3 className="mt-4 font-medium text-white">
            No live locations yet
          </h3>

          <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
            Enable location sharing on a registered device
            to see its location on the map.
          </p>

        </div>

      </section>

      {/* Devices section */}
      <section>

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Your Devices
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              An overview of your registered devices.
            </p>
          </div>

          <button className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
            + Add Device
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
            />
          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;
