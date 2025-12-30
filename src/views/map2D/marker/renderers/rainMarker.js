import { MARKER_ICON_CONFIG } from "../config/markerIconConfig";
import { resolveMarkerStyle } from "../utils/markerHelper";
import { RAIN_MARKER_LIST } from "../../markerList";
import SiteMarker from "@/utils/map2D/SiteMarker";

export function addRainMarkerList(ctx) {
  const typeConfig = MARKER_ICON_CONFIG.rain;
  if (!typeConfig) return;

  RAIN_MARKER_LIST.forEach(group => {
    group.list.forEach(markerData => {
      const style = resolveMarkerStyle(typeConfig, markerData);

      const marker = new SiteMarker(
        ctx.map,
        [markerData.longitude, markerData.latitude],
        {
          name: markerData.name,
          status: `${markerData.value}m`,
          statusColor: style.statusColor,
          borderColor: style.borderColor,
          icon: style.icon,
          iconWidth: 34,
          iconHeight: 41,
          iconOffset: [0, -21]
        }
      );

      marker.onClick((e, markerInstance) => {
        ctx.handleMarkerClick(e, markerInstance, markerData);
      });

      ctx.markerCluster && ctx.markerCluster.addMarker(marker);
    });
  });
}
