import type { TrailRegion, TrailRegionInput } from "../entities/types";
import { listTrails, deleteTrail } from "./trailStore";

const regions = new Map<string, TrailRegion>();
let nextId = 1;

function normalizeName(name: string): string {
  return name.trim();
}

function validateNameUniqueness(trimmedName: string, excludeId?: string) {
  const normalized = trimmedName.toLowerCase();
  for (const region of regions.values()) {
    if (excludeId && region.id === excludeId) continue;
    if (region.name.trim().toLowerCase() === normalized) {
      throw new Error(`Region name already exists: ${trimmedName}`);
    }
  }
}

export function createRegion(input: TrailRegionInput): TrailRegion {
  const trimmedName = normalizeName(input.name);
  if (trimmedName.length < 1 || trimmedName.length > 100) {
    throw new Error("Region name must be between 1 and 100 characters.");
  }

  validateNameUniqueness(trimmedName);

  const region: TrailRegion = { id: String(nextId++), name: trimmedName };
  regions.set(region.id, region);
  return region;
}

export function getRegion(id: string): TrailRegion | undefined {
  return regions.get(id);
}

export function listRegions(): TrailRegion[] {
  return Array.from(regions.values());
}

export function updateRegion(
  id: string,
  input: Partial<TrailRegionInput>
): TrailRegion | undefined {
  const existing = regions.get(id);
  if (!existing) return undefined;

  let nextName = existing.name;
  if (input.name !== undefined) {
    nextName = normalizeName(input.name);
    if (nextName.length < 1 || nextName.length > 100) {
      throw new Error("Region name must be between 1 and 100 characters.");
    }
    validateNameUniqueness(nextName, id);
  }

  const updated: TrailRegion = {
    ...existing,
    ...input,
    name: nextName,
  };
  regions.set(id, updated);
  return updated;
}

export function deleteRegion(id: string): boolean {
  // Cascade delete trails for this region
  const trailsForRegion = listTrails().filter((t) => t.regionId === id);
  trailsForRegion.forEach((t) => deleteTrail(t.id));

  return regions.delete(id);
}

export function _resetRegions(): void {
  regions.clear();
  nextId = 1;
}
