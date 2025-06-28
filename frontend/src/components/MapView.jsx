import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet marker icons (required!)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = ({ destinations }) => {
  if (!destinations.length) return null;

  const center = [
    destinations[0]?.latitude || 20.5937, // Default to India
    destinations[0]?.longitude || 78.9629,
  ];

  return (
    <div className="mt-4 mb-5">
      <h4 className="text-center mb-3">🗺️ Explore on Map</h4>
      <MapContainer center={center} zoom={4} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {destinations.map((dest, idx) => (
          <Marker key={idx} position={[dest.latitude, dest.longitude]}>
            <Popup>
              <strong>{dest.destinationname}</strong> <br />
              {dest.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
