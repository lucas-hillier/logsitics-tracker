import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useLeafletMap } from "../../hooks/useLeafletMap";
import { useMapMarkers } from "../../hooks/useMapMarkers";

const MapView = () => {
  const { drivers, selectedDriverId } = useSelector(
    (s: RootState) => s.drivers,
  );

  const { mapRef, initMap } = useLeafletMap();

  useMapMarkers(mapRef, drivers, selectedDriverId);

  return <div ref={initMap} style={{ width: "100%", height: "100%" }} />;
};

export default MapView;
