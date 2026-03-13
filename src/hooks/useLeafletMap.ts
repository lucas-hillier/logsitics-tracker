import { useRef, useEffect, useCallback } from "react";
import L from "leaflet";

const MAP_CONFIG = {
  center: [48.5, -56.0] as L.LatLngTuple, // Newfoundland
  zoom: 7,
  tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: "© OpenStreetMap contributors",
};

export const useLeafletMap = () => {
  const mapRef = useRef<L.Map | null>(null);

  const initMap = useCallback((container: HTMLDivElement | null) => {
    if (!container || mapRef.current) return;

    mapRef.current = L.map(container, {
      center: MAP_CONFIG.center,
      zoom: MAP_CONFIG.zoom,
    });

    L.tileLayer(MAP_CONFIG.tileUrl, {
      attribution: MAP_CONFIG.attribution,
    }).addTo(mapRef.current);
  }, []);

  useEffect(() => {
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return { mapRef, initMap };
};
