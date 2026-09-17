import { beforeEach, describe, expect, it } from "vitest";
import {
  _resetTrails,
  createTrail,
  deleteTrail,
  getTrail,
  listTrails,
  updateTrail,
} from "../trailStore";

describe("trailStore", () => {
  beforeEach(() => {
    _resetTrails();
  });

  it("creates a trail", () => {
    const trail = createTrail({
      name: "Eagle Ridge",
      location: "Boulder, CO",
      distanceKm: 8.5,
      difficulty: "moderate",
    });

    expect(trail.id).toBeDefined();
    expect(trail.name).toBe("Eagle Ridge");
  });

  it("gets a trail by id", () => {
    const created = createTrail({
      name: "Eagle Ridge",
      location: "Boulder, CO",
      distanceKm: 8.5,
      difficulty: "moderate",
    });

    expect(getTrail(created.id)).toEqual(created);
    expect(getTrail("missing")).toBeUndefined();
  });

  it("lists all trails", () => {
    createTrail({ name: "Trail A", location: "A", distanceKm: 1, difficulty: "easy" });
    createTrail({ name: "Trail B", location: "B", distanceKm: 2, difficulty: "hard" });

    expect(listTrails()).toHaveLength(2);
  });

  it("updates a trail", () => {
    const created = createTrail({
      name: "Eagle Ridge",
      location: "Boulder, CO",
      distanceKm: 8.5,
      difficulty: "moderate",
    });

    const updated = updateTrail(created.id, { distanceKm: 9.2 });

    expect(updated?.distanceKm).toBe(9.2);
    expect(updated?.name).toBe("Eagle Ridge");
  });

  it("returns undefined when updating a missing trail", () => {
    expect(updateTrail("missing", { distanceKm: 1 })).toBeUndefined();
  });

  it("deletes a trail", () => {
    const created = createTrail({
      name: "Eagle Ridge",
      location: "Boulder, CO",
      distanceKm: 8.5,
      difficulty: "moderate",
    });

    expect(deleteTrail(created.id)).toBe(true);
    expect(getTrail(created.id)).toBeUndefined();
    expect(deleteTrail(created.id)).toBe(false);
  });
});
