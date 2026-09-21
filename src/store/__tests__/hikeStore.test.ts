import { beforeEach, describe, expect, it } from "vitest";
import { _resetTrails, createTrail } from "../trailStore";
import {
  _resetHikes,
  createHike,
  deleteHike,
  getHike,
  listHikes,
  listHikesByTrail,
  updateHike,
} from "../hikeStore";

describe("hikeStore", () => {
  let trailId: string;

  beforeEach(() => {
    _resetTrails();
    _resetHikes();
    trailId = createTrail({
      name: "Eagle Ridge",
      location: "Boulder, CO",
      distanceKm: 8.5,
      difficulty: "moderate",
      trailRegionId: "1",
      regionId: "1",
      elevationGainM: 850,
    }).id;
  });

  it("creates a hike linked to an existing trail", () => {
    const hike = createHike({
      trailId,
      date: "2026-01-05",
      durationMinutes: 120,
      rating: 4,
    });

    expect(hike.id).toBeDefined();
    expect(hike.trailId).toBe(trailId);
  });

  it("rejects creating a hike for a missing trail", () => {
    expect(() =>
      createHike({
        trailId: "missing",
        date: "2026-01-05",
        durationMinutes: 120,
        rating: 4,
      })
    ).toThrow(/Trail not found/);
  });

  it("gets a hike by id", () => {
    const created = createHike({
      trailId,
      date: "2026-01-05",
      durationMinutes: 120,
      rating: 4,
    });

    expect(getHike(created.id)).toEqual(created);
    expect(getHike("missing")).toBeUndefined();
  });

  it("lists all hikes", () => {
    createHike({
      trailId,
      date: "2026-01-05",
      durationMinutes: 120,
      rating: 4,
    });
    createHike({
      trailId,
      date: "2026-01-06",
      durationMinutes: 90,
      rating: 5,
    });

    expect(listHikes()).toHaveLength(2);
  });

  it("lists hikes by trail id", () => {
    const otherTrailId = createTrail({
      name: "Other Trail",
      location: "Denver, CO",
      distanceKm: 5,
      difficulty: "easy",
      trailRegionId: "1",
      regionId: "1",
      elevationGainM: 100,
    }).id;

    createHike({
      trailId,
      date: "2026-01-05",
      durationMinutes: 120,
      rating: 4,
    });
    createHike({
      trailId,
      date: "2026-01-06",
      durationMinutes: 90,
      rating: 5,
    });
    createHike({
      trailId: otherTrailId,
      date: "2026-01-07",
      durationMinutes: 60,
      rating: 3,
    });

    expect(listHikesByTrail(trailId)).toHaveLength(2);
    expect(listHikesByTrail(trailId).every((h) => h.trailId === trailId)).toBe(true);
    expect(listHikesByTrail(otherTrailId)).toHaveLength(1);
  });

  it("returns an empty array when a trail has no hikes", () => {
    const otherTrailId = createTrail({
      name: "No Hikes Trail",
      location: "Austin, TX",
      distanceKm: 12,
      difficulty: "hard",
      trailRegionId: "1",
      regionId: "1",
      elevationGainM: 1200,
    }).id;

    expect(listHikesByTrail(otherTrailId)).toEqual([]);
  });

  it("updates a hike", () => {
    const created = createHike({
      trailId,
      date: "2026-01-05",
      durationMinutes: 120,
      rating: 4,
    });

    const updated = updateHike(created.id, { durationMinutes: 150 });

    expect(updated?.durationMinutes).toBe(150);
  });

  it("rejects updating a hike to a missing trail", () => {
    const created = createHike({
      trailId,
      date: "2026-01-05",
      durationMinutes: 120,
      rating: 4,
    });

    expect(() => updateHike(created.id, { trailId: "missing" })).toThrow(/Trail not found/);
  });

  it("returns undefined when updating a missing hike", () => {
    expect(updateHike("missing", { durationMinutes: 1 })).toBeUndefined();
  });

  it("rejects rating less than 1", () => {
    expect(() =>
      createHike({
        trailId,
        date: "2026-01-05",
        durationMinutes: 120,
        rating: 0,
      })
    ).toThrow(/Rating must be an integer between 1 and 5/);
  });

  it("rejects rating greater than 5", () => {
    expect(() =>
      createHike({
        trailId,
        date: "2026-01-05",
        durationMinutes: 120,
        rating: 6,
      })
    ).toThrow(/Rating must be an integer between 1 and 5/);
  });

  it("rejects non-integer rating", () => {
    expect(() =>
      createHike({
        trailId,
        date: "2026-01-05",
        durationMinutes: 120,
        rating: 3.5,
      })
    ).toThrow(/Rating must be an integer between 1 and 5/);
  });

  it("allows notes to be omitted", () => {
    const created = createHike({
      trailId,
      date: "2026-01-05",
      durationMinutes: 120,
      rating: 4,
    });

    expect(created.notes).toBeUndefined();
  });

  it("deletes a hike", () => {
    const created = createHike({
      trailId,
      date: "2026-01-05",
      durationMinutes: 120,
      rating: 4,
    });

    expect(deleteHike(created.id)).toBe(true);
    expect(getHike(created.id)).toBeUndefined();
    expect(deleteHike(created.id)).toBe(false);
  });
});
