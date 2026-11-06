import DeviceMap from "../components/DeviceMap";
import { useEffect, useRef, useState } from "react";

import {
  Smartphone,
  Wifi,
  WifiOff,
  Users
} from "lucide-react";

import StatCard from "../components/StatCard";
import DeviceCard from "../components/DeviceCard";
import DeviceForm from "../components/DeviceForm";

function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Keeps track of active browser location watchers.
  const watchersRef = useRef({});

  function handleAddDevice(newDevice) {
    setDevices((previousDevices) => [
      ...previousDevices,
      newDevice
    ]);

    setShowForm(false);
  }

  function handleStartSharing(deviceId) {
    if (!navigator.geolocation) {
      alert("Your browser does not support location sharing.");
      return;
    }

    // Prevent starting multiple watchers for the same device.
    if (watchersRef.current[deviceId] !== undefined) {
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setDevices((previousDevices) =>
          previousDevices.map((device) =>
            device.id === deviceId
              ? {
                  ...device,
                  isSharing: true,
                  status: "Online",
                  latitude: latitude,
                  longitude: longitude,
                  location: `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`,
                  lastUpdated: new Date().toLocaleTimeString()
                }
              : device
          )
        );
      },

      (error) => {
        const activeWatch = watchersRef.current[deviceId];

        if (activeWatch !== undefined) {
          navigator.geolocation.clearWatch(activeWatch);
          delete watchersRef.current[deviceId];
        }

        setDevices((previousDevices) =>
          previousDevices.map((device) =>
            device.id === deviceId
              ? {
                  ...device,
                  isSharing: false,
                  status: "Not sharing",
                  location: "Location sharing is off"
                }
              : device
          )
        );

        if (error.code === 1) {
          alert("Location permission was denied. Allow location access in your browser to share.");
        } else if (error.code === 2) {
          alert("Your current location could not be determined. Please try again.");
        } else if (error.code === 3) {
          alert("Getting your location took too long. Please try again.");
        } else {
          alert("Something went wrong while getting your location.");
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );

    watchersRef.current[deviceId] = watchId;
  }

  function handleStopSharing(deviceId) {
    const watchId = watchersRef.current[deviceId];

    if (watchId !== undefined) {
      navigator.geolocation.clearWatch(watchId);
      delete watchersRef.current[deviceId];
    }

    setDevices((previousDevices) =>
      previousDevices.map((device) =>
        device.id === deviceId
          ? {
              ...device,
              isSharing: false,
              status: "Not sharing",
              location: "Location sharing is off",
              lastUpdated: "Stopped by owner"
            }
          : device
      )
    );
  }

  function handleToggleSharing(deviceId, isSharing) {
    if (isSharing) {
      handleStopSharing(deviceId);
    } else {
      handleStartSharing(deviceId);
    }
  }

  function handleRemoveDevice(deviceId) {
    const watchId = watchersRef.current[deviceId];

    if (watchId !== undefined) {
      navigator.geolocation.clearWatch(watchId);
      delete watchersRef.current[deviceId];
    }

    setDevices((previousDevices) =>
      previousDevices.filter(
        (device) => device.id !== deviceId
      )
    );
  }

  // Stop all active location watchers when Dashboard unmounts.
  useEffect(() => {
    return () => {
      Object.values(watchersRef.current).forEach((watchId) => {
        navigator.geolocation.clearWatch(watchId);
      });
    };
  }, []);

  const totalDevices = devices.length;

  const onlineDevices = devices.filter(
    (device) => device.status === "Online"
  ).length;

  const offlineDevices = devices.filter(
    (device) => device.status === "Offline"
  ).length;

  const sharedDevices = devices.filter(
    (device) => device.isSharing
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Manage your devices and location sharing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Devices"
          value={totalDevices}
          description="Registered devices"
          icon={Smartphone}
          color="bg-violet-500/10 text-violet-400"
        />

        <StatCard
          title="Online Devices"
          value={onlineDevices}
          description="Currently sending location"
          icon={Wifi}
          color="bg-emerald-500/10 text-emerald-400"
        />

        <StatCard
          title="Offline Devices"
          value={offlineDevices}
          description="Currently offline"
          icon={WifiOff}
          color="bg-orange-500/10 text-orange-400"
        />

        <StatCard
          title="Shared Devices"
          value={sharedDevices}
          description="Actively sharing location"
          icon={Users}
          color="bg-blue-500/10 text-blue-400"
        />
      </div>

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Device Locations
          </h2>

          <p className="mt-1 text-sm text-slate-400">
             View the current locations of devices sharing with you.
          </p>
        </div>

        <div className="flex h-72 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950">
          <div className="rounded-full bg-violet-500/10 p-4 text-violet-400">
            <Smartphone size={32} />
          </div>

          <h3 className="mt-4 font-medium text-white">
            No live map yet
          </h3>

          <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
            Location coordinates will appear on your device cards
            when sharing is enabled.
          </p>
        </div>
         <DeviceMap devices={devices} />
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Your Devices
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Manage your registered devices.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            + Add Device
          </button>
        </div>

        {devices.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {devices.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onRemove={handleRemoveDevice}
                onToggleSharing={handleToggleSharing}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
            <Smartphone
              size={35}
              className="mx-auto text-slate-500"
            />

            <h3 className="mt-4 font-semibold text-white">
              No devices registered
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Add your first device to get started.
            </p>
          </div>
        )}
      </section>

      {showForm && (
        <DeviceForm
          onAddDevice={handleAddDevice}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
