import { beforeEach, describe, expect, it } from "vitest";
import { _resetTrails, createTrail } from "../trailStore";
import {
  _resetHikes,
  createHike,
  deleteHike,
  getHike,
  listHikes,
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
    }).id;
  });

  it("creates a hike linked to an existing trail", () => {
    const hike = createHike({ trailId, date: "2026-01-05", durationMinutes: 120 });

    expect(hike.id).toBeDefined();
    expect(hike.trailId).toBe(trailId);
  });

  it("rejects creating a hike for a missing trail", () => {
    expect(() =>
      createHike({ trailId: "missing", date: "2026-01-05", durationMinutes: 120 })
    ).toThrow(/Trail not found/);
  });

  it("gets a hike by id", () => {
    const created = createHike({ trailId, date: "2026-01-05", durationMinutes: 120 });

    expect(getHike(created.id)).toEqual(created);
    expect(getHike("missing")).toBeUndefined();
  });

  it("lists all hikes", () => {
    createHike({ trailId, date: "2026-01-05", durationMinutes: 120 });
    createHike({ trailId, date: "2026-01-06", durationMinutes: 90 });

    expect(listHikes()).toHaveLength(2);
  });

  it("updates a hike", () => {
    const created = createHike({ trailId, date: "2026-01-05", durationMinutes: 120 });

    const updated = updateHike(created.id, { durationMinutes: 150 });

    expect(updated?.durationMinutes).toBe(150);
  });

  it("rejects updating a hike to a missing trail", () => {
    const created = createHike({ trailId, date: "2026-01-05", durationMinutes: 120 });

    expect(() => updateHike(created.id, { trailId: "missing" })).toThrow(/Trail not found/);
  });

  it("returns undefined when updating a missing hike", () => {
    expect(updateHike("missing", { durationMinutes: 1 })).toBeUndefined();
  });

  it("deletes a hike", () => {
    const created = createHike({ trailId, date: "2026-01-05", durationMinutes: 120 });

    expect(deleteHike(created.id)).toBe(true);
    expect(getHike(created.id)).toBeUndefined();
    expect(deleteHike(created.id)).toBe(false);
  });
});
