
import {
  Smartphone,
  Laptop,
  MapPin,
  Clock,
  Trash2,
  MapPinOff
} from "lucide-react";

function DeviceCard({ device, onRemove, onToggleSharing }) {
  const DeviceIcon =
    device.type === "Laptop" ? Laptop : Smartphone;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-slate-800 p-3 text-violet-400">
            <DeviceIcon size={24} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {device.name}
            </h3>
            <p className="text-xs text-slate-400">
              {device.type}
            </p>
          </div>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs ${
          device.isSharing
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-slate-700 text-slate-400"
        }`}>
          {device.isSharing ? "Sharing" : "Not sharing"}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <MapPin size={16} />
          <span>{device.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock size={16} />
          <span>{device.lastUpdated}</span>
        </div>
      </div>

      <button
        onClick={() => onToggleSharing(device.id, device.isSharing)}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium transition ${
          device.isSharing
            ? "border border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
            : "bg-violet-600 text-white hover:bg-violet-700"
        }`}
      >
        {device.isSharing ? (
          <>
            <MapPinOff size={16} />
            Stop Sharing
          </>
        ) : (
          <>
            <MapPin size={16} />
            Start Sharing
          </>
        )}
      </button>

      <button
        onClick={() => onRemove(device.id)}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
      >
        <Trash2 size={16} />
        Remove Device
      </button>
    </div>
  );
}

export default DeviceCard;
