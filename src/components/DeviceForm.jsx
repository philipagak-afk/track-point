
import { useState } from "react";
import { X, Smartphone, Laptop } from "lucide-react";

function DeviceForm({ onAddDevice, onClose }) {

  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("Smartphone");

  function handleSubmit(event) {
    event.preventDefault();

    if (!deviceName.trim()) {
      return;
    }

    const newDevice = {
      id: crypto.randomUUID(),
      name: deviceName.trim(),
      type: deviceType,
      status: "Not sharing",
      location: "Location sharing is off",
      lastUpdated: "Not yet shared"
    };

    onAddDevice(newDevice);

    setDeviceName("");
    setDeviceType("Smartphone");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl">

        {/* Form heading */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              Register a Device
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Add a device to your TrackPoint account.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>

        </div>

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Device Name
            </label>

            <input
              type="text"
              value={deviceName}
              onChange={(event) => setDeviceName(event.target.value)}
              placeholder="e.g. My Samsung Phone"
              required
              maxLength={40}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Device Type
            </label>

            <select
              value={deviceType}
              onChange={(event) => setDeviceType(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-violet-500"
            >
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Tablet">Tablet</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-3">

              {deviceType === "Laptop" ? (
                <Laptop className="text-violet-400" size={24} />
              ) : (
                <Smartphone className="text-violet-400" size={24} />
              )}

              <div>
                <p className="text-sm font-medium">
                  {deviceName || "Device preview"}
                </p>

                <p className="text-xs text-slate-500">
                  {deviceType}
                </p>
              </div>

            </div>
          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-700 py-3 text-sm hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-violet-600 py-3 text-sm font-semibold hover:bg-violet-700"
            >
              Register Device
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default DeviceForm;
