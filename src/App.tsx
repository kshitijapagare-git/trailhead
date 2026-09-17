import { useState } from "react";
import type { Hike, Trail } from "./entities/types";
import { createHike, listHikes } from "./store/hikeStore";
import { createTrail, listTrails } from "./store/trailStore";
import "./App.css";

function seed() {
  if (listTrails().length > 0) return;
  const trail = createTrail({
    name: "Eagle Ridge",
    location: "Boulder, CO",
    distanceKm: 8.5,
    difficulty: "moderate",
  });
  createHike({ trailId: trail.id, date: "2026-01-05", durationMinutes: 120 });
}

seed();

function App() {
  const [trails] = useState<Trail[]>(() => listTrails());
  const [hikes] = useState<Hike[]>(() => listHikes());

  return (
    <main>
      <h1>Trailhead</h1>

      <section>
        <h2>Trails</h2>
        <ul>
          {trails.map((trail) => (
            <li key={trail.id}>
              {trail.name} — {trail.location} — {trail.distanceKm}km — {trail.difficulty}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Hikes</h2>
        <ul>
          {hikes.map((hike) => (
            <li key={hike.id}>
              Trail {hike.trailId} — {hike.date} — {hike.durationMinutes} min
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;
