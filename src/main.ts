declare global {
  interface Window {
    CESIUM_BASE_URL: string;
  }
}

window.CESIUM_BASE_URL = "/cesium";

import {
  Cartesian3,
  Ion,
  Math,
  Terrain,
  Viewer,
  createOsmBuildingsAsync,
} from "cesium";

Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ACCESS_TOKEN;

const viewer = new Viewer("container", {
  terrain: Terrain.fromWorldTerrain(),
});
// Fly the camera to San Francisco at the given longitude, latitude, and height.
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
  orientation: {
    heading: Math.toRadians(0.0),
    pitch: Math.toRadians(-15.0),
  },
});

// Add Cesium OSM Buildings, a global 3D buildings layer.
createOsmBuildingsAsync().then((buildingTileset) => {
  viewer!.scene.primitives.add(buildingTileset);
});
