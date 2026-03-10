import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { Driver } from "../types";

interface DriverMarkerProps {
  driver: Driver;
}

const DriverMarker = ({ driver }: DriverMarkerProps) => {
  //   const map = useMap();

  return (
    <Marker
      position={[driver.latitude, driver.longitude]}
      icon={L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      })}
    >
      <Popup>
        <strong>{driver.name}</strong>
        <br />
        Status: {driver.status}
        <br />
        ETA: {driver.eta ? driver.eta : "N/A"}
        <br />
      </Popup>
    </Marker>
  );
};

export default DriverMarker;
