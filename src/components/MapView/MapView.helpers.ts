import L from "leaflet";
import type { Driver } from "../../types";
import { STATUS_COLORS } from "../../constants";

export const makeIcon = (driver: Driver, isSelected: boolean) =>
  L.divIcon({
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    html: `
      <div style="
        width:36px;height:36px;border-radius:50%;
        background:${STATUS_COLORS[driver.status]};
        border:${isSelected ? "3px solid #000" : "2px solid #fff"};
        display:flex;align-items:center;justify-content:center;
        color:#fff;font-weight:700;font-size:13px;
        box-shadow:0 2px 6px rgba(0,0,0,0.3);
        cursor:pointer;
      ">${driver.id}</div>
    `,
  });

export const makePopupContent = (driver: Driver) => `
  <div style="font-size:13px;min-width:160px;line-height:1.6;">
    <strong>${driver.name}</strong><br/>
    ${driver.origin.name} → ${driver.destination.name}<br/>
    Status: <b>${driver.status}</b><br/>
    ETA: ${driver.eta}
  </div>
`;
