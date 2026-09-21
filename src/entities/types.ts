export type Difficulty = "easy" | "moderate" | "hard";

export interface Trail {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  difficulty: Difficulty;
  trailRegionId: string;
}

export type TrailInput = Omit<Trail, "id">;

export interface TrailRegion {
  id: string;
  name: string;
}

export type TrailRegionInput = Omit<TrailRegion, "id">;

export interface Hike {
  id: string;
  trailId: string;
  date: string;
  durationMinutes: number;
}

export type HikeInput = Omit<Hike, "id">;
