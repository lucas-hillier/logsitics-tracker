import { MapContainer, TileLayer } from "react-leaflet";
import { initialDrivers } from "../server/mockData";
import DriverMarker from "./DriverMarker";
import type { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const drivers = [...initialDrivers];
  const position: LatLngTuple = [49.24, -56.19];
  return (
    <MapContainer
      center={position}
      zoom={7}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {drivers.map((driver) => (
        <DriverMarker key={driver.driverId} driver={driver} />
      ))}
    </MapContainer>
  );
};

export default Map;
