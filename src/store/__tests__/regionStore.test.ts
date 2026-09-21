import { beforeEach, describe, expect, it } from "vitest";
import {
  _resetRegions,
  createRegion,
  deleteRegion,
  getRegion,
  listRegions,
  updateRegion,
} from "../regionStore";
import { _resetTrails, createTrail, listTrails } from "../trailStore";

describe("regionStore", () => {
  beforeEach(() => {
    _resetRegions();
    _resetTrails();
  });

  it("creates a region", () => {
    const region = createRegion({ name: " Rockies " });
    expect(region.id).toBeDefined();
    expect(region.name).toBe("Rockies");
  });

  it("rejects duplicate names (case-insensitive) on create", () => {
    createRegion({ name: " Rockies " });

    expect(() => createRegion({ name: "rockies" })).toThrowError();
  });

  it("rejects empty and too-long names", () => {
    expect(() => createRegion({ name: "   " })).toThrowError();

    const tooLong = "a".repeat(101);
    expect(() => createRegion({ name: tooLong })).toThrowError();
  });

  it("gets a region by id", () => {
    const created = createRegion({ name: "Rockies" });
    expect(getRegion(created.id)).toEqual(created);
    expect(getRegion("missing")).toBeUndefined();
  });

  it("lists all regions", () => {
    createRegion({ name: "A" });
    createRegion({ name: "B" });

    expect(listRegions()).toHaveLength(2);
  });

  it("updates a region", () => {
    const created = createRegion({ name: "Rockies" });
    const updated = updateRegion(created.id, { name: "Front Range" });

    expect(updated?.name).toBe("Front Range");
  });

  it("rejects duplicate names (case-insensitive) on update", () => {
    const a = createRegion({ name: "A" });
    const b = createRegion({ name: "B" });

    expect(() => updateRegion(b.id, { name: " a  " })).toThrowError();
  });

  it("cascade deletes dependent trails", () => {
    const r1 = createRegion({ name: "Region 1" });
    const r2 = createRegion({ name: "Region 2" });

    createTrail({
      name: "Trail 1",
      location: "X",
      distanceKm: 1,
      difficulty: "easy",
      trailRegionId: r1.id,
    });

    createTrail({
      name: "Trail 2",
      location: "Y",
      distanceKm: 2,
      difficulty: "hard",
      trailRegionId: r2.id,
    });

    expect(listTrails()).toHaveLength(2);

    expect(deleteRegion(r1.id)).toBe(true);
    expect(getRegion(r1.id)).toBeUndefined();

    const remaining = listTrails();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].trailRegionId).toBe(r2.id);
  });
});
