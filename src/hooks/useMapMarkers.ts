import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import L from "leaflet";
import type { RefObject } from "react";
import type { AppDispatch } from "../store/store";
import { selectDriver } from "../store/driversSlice";
import type { Driver } from "../types";
import {
  makeIcon,
  makePopupContent,
} from "../components/MapView/MapView.helpers";

export const useMapMarkers = (
  mapRef: RefObject<L.Map | null>,
  drivers: Driver[],
  selectedDriverId: string | null,
) => {
  const dispatch = useDispatch<AppDispatch>();
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const selectedIdRef = useRef<string | null>(selectedDriverId);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || drivers.length === 0) return;

    selectedIdRef.current = selectedDriverId;

    drivers.forEach((driver) => {
      const isSelected = driver.id === selectedDriverId;
      const existing = markersRef.current.get(driver.id);

      if (existing) {
        existing.setLatLng([driver.lat, driver.lng]);
        existing.setIcon(makeIcon(driver, isSelected));

        if (isSelected) {
          existing
            .bindPopup(makePopupContent(driver), { closeButton: false })
            .openPopup();
        } else {
          existing.closePopup();
        }
        return;
      }

      const marker = L.marker([driver.lat, driver.lng], {
        icon: makeIcon(driver, isSelected),
      }).addTo(map);

      marker.on("click", () => {
        const current = selectedIdRef.current;
        dispatch(selectDriver(driver.id === current ? null : driver.id));
      });

      if (isSelected) {
        marker
          .bindPopup(makePopupContent(driver), { closeButton: false })
          .openPopup();
      }

      markersRef.current.set(driver.id, marker);
    });
  }, [mapRef, drivers, selectedDriverId, dispatch]);

  useEffect(() => {
    const markers = markersRef.current;

    return () => {
      markers.forEach((marker) => marker.remove());
      markers.clear();
    };
  }, []);
};
