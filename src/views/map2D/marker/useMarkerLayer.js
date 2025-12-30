import { addWaterMarkerList } from "./renderers/waterMarker";
import { addRainMarkerList } from "./renderers/rainMarker";
import { addProjectMarkerList } from "./renderers/projectMarker";
import { addFlowMarkerList } from "./renderers/flowMarker";
import { addWaterQualityMarkerList } from "./renderers/waterQualityMarker";
import { addSafetyMarkerList } from "./renderers/safetyMarker";
import { addSoilMarkerList } from "./renderers/soilMarker";
import { addVideoMarkerList } from "./renderers/videoMarker";
export function addMarkerByType(type, ctx) {
  switch (type) {
    case "water":
      addWaterMarkerList(ctx);
      break;
    case "rain":
      addRainMarkerList(ctx);
      break;
    case "project":
      addProjectMarkerList(ctx);
      break;
    case "flow":
      addFlowMarkerList(ctx);
      break;
    case "waterQuality":
      addWaterQualityMarkerList(ctx);
      break;
    case "safety":
      addSafetyMarkerList(ctx);
      break;
    case "soil":
      addSoilMarkerList(ctx);
      break;
    case "video":
      addVideoMarkerList(ctx);
      break;
    default:
      console.warn("未知的 marker 类型:", type);
  }
}
