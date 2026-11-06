
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

// Automatically adjust the map when device locations change.
function MapUpdater({ devices }) {
  const map = useMap();

const firstDevice = devices[0];

useEffect(() => {
  if (firstDevice) {
    map.setView(
      [firstDevice.latitude, firstDevice.longitude],
      13
    );
  }
}, [
  map,
  firstDevice?.latitude,
  firstDevice?.longitude
]);

  return null;
}

function DeviceMap({ devices }) {
  const devicesWithLocation = devices.filter(
    (device) =>
      device.isSharing &&
      typeof device.latitude === "number" &&
      typeof device.longitude === "number"
  );

  const initialCenter =
    devicesWithLocation.length > 0
      ? [
          devicesWithLocation[0].latitude,
          devicesWithLocation[0].longitude
        ]
      : [0, 0];

  return (
    <div className="overflow-hidden rounded-xl">
      {devicesWithLocation.length === 0 ? (
        <div className="flex h-80 flex-col items-center justify-center border border-dashed border-slate-700 bg-slate-950 text-center">
          <p className="text-lg font-medium text-white">
            No live locations yet
          </p>

          <p className="mt-2 max-w-sm px-4 text-sm text-slate-500">
            Start sharing a device's location to see it on the map.
          </p>
        </div>
      ) : (
        <MapContainer
          center={initialCenter}
          zoom={13}
          scrollWheelZoom={true}
          className="h-80 w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater devices={devicesWithLocation} />

          {devicesWithLocation.map((device) => (
            <CircleMarker
              key={device.id}
              center={[
                device.latitude,
                device.longitude
              ]}
              radius={10}
              pathOptions={{
                color: "#ffffff",
                fillColor: "#8b5cf6",
                fillOpacity: 1,
                weight: 3
              }}
            >
              <Popup>
                <div>
                  <strong>{device.name}</strong>
                  <br />
                  {device.type}
                  <br />
                  <span>
                    {device.latitude.toFixed(5)},{" "}
                    {device.longitude.toFixed(5)}
                  </span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

export default DeviceMap;
