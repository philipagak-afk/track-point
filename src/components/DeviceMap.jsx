
import { useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapUpdater({ devices, currentLocation }) {
  const map = useMap();

  useEffect(() => {
    // Prioritize the user's current location.
    if (currentLocation) {
      map.setView(
        [currentLocation.latitude, currentLocation.longitude],
        15
      );
      return;
    }

    // Otherwise, center on the first sharing device.
    if (devices.length > 0) {
      map.setView(
        [devices[0].latitude, devices[0].longitude],
        13
      );
    }
  }, [
    map,
    currentLocation?.latitude,
    currentLocation?.longitude,
    devices
  ]);

  return null;
}

function DeviceMap({ devices, currentLocation }) {
  const devicesWithLocation = devices.filter(
    (device) =>
      device.isSharing &&
      typeof device.latitude === "number" &&
      typeof device.longitude === "number"
  );

  const hasLocations =
    devicesWithLocation.length > 0 || currentLocation !== null;

  const initialCenter = currentLocation
    ? [currentLocation.latitude, currentLocation.longitude]
    : devicesWithLocation.length > 0
      ? [
          devicesWithLocation[0].latitude,
          devicesWithLocation[0].longitude
        ]
      : [0, 0];

  if (!hasLocations) {
    return (
      <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950 text-center">
        <p className="text-lg font-medium text-white">
          No locations available
        </p>

        <p className="mt-2 max-w-sm px-4 text-sm text-slate-500">
          Use Locate Me or enable sharing on a registered device.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl">
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

        <MapUpdater
          devices={devicesWithLocation}
          currentLocation={currentLocation}
        />

        {/* Your personal current location */}
        {currentLocation && (
          <CircleMarker
            center={[
              currentLocation.latitude,
              currentLocation.longitude
            ]}
            radius={12}
            pathOptions={{
              color: "#ffffff",
              fillColor: "#2563eb",
              fillOpacity: 1,
              weight: 3
            }}
          >
            <Popup>
              <strong>My Current Location</strong>
              <br />
              {currentLocation.latitude.toFixed(5)},{" "}
              {currentLocation.longitude.toFixed(5)}
            </Popup>
          </CircleMarker>
        )}

        {/* Registered devices sharing their locations */}
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
              <strong>{device.name}</strong>
              <br />
              {device.type}
              <br />
              {device.latitude.toFixed(5)},{" "}
              {device.longitude.toFixed(5)}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default DeviceMap;
