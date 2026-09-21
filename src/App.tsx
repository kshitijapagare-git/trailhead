import { Navigate, Route, HashRouter, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { HikeFormPage } from "./pages/HikeFormPage";
import { HikesPage } from "./pages/HikesPage";
import { TrailFormPage } from "./pages/TrailFormPage";
import { TrailsPage } from "./pages/TrailsPage";
import { RegionsPage } from "./pages/RegionsPage";
import { RegionFormPage } from "./pages/RegionFormPage";
import { createHike } from "./store/hikeStore";
import { createTrail, listTrails } from "./store/trailStore";
import { createRegion, listRegions } from "./store/regionStore";
import "./App.css";

function seed() {
  if (listTrails().length > 0) return;

  const region = listRegions().length
    ? listRegions()[0]
    : createRegion({ name: "Rockies" });

  const trail = createTrail({
    name: "Eagle Ridge",
    location: "Boulder, CO",
    distanceKm: 8.5,
    difficulty: "moderate",
    trailRegionId: region.id,
    regionId: region.id,
    elevationGainM: 850,
  });
  createHike({ trailId: trail.id, date: "2026-01-05", durationMinutes: 120 });
}

seed();

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/trails" replace />} />
          <Route path="trails" element={<TrailsPage />} />
          <Route path="trails/new" element={<TrailFormPage />} />
          <Route path="trails/:id/edit" element={<TrailFormPage />} />
          <Route path="regions" element={<RegionsPage />} />
          <Route path="regions/new" element={<RegionFormPage />} />
          <Route path="regions/:id/edit" element={<RegionFormPage />} />
          <Route path="hikes" element={<HikesPage />} />
          <Route path="hikes/new" element={<HikeFormPage />} />
          <Route path="hikes/:id/edit" element={<HikeFormPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
