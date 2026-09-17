import type { Trail, TrailInput } from "../entities/types";

const trails = new Map<string, Trail>();
let nextId = 1;

export function createTrail(input: TrailInput): Trail {
  const trail: Trail = { id: String(nextId++), ...input };
  trails.set(trail.id, trail);
  return trail;
}

export function getTrail(id: string): Trail | undefined {
  return trails.get(id);
}

export function listTrails(): Trail[] {
  return Array.from(trails.values());
}

export function updateTrail(id: string, input: Partial<TrailInput>): Trail | undefined {
  const existing = trails.get(id);
  if (!existing) return undefined;
  const updated: Trail = { ...existing, ...input };
  trails.set(id, updated);
  return updated;
}

export function deleteTrail(id: string): boolean {
  return trails.delete(id);
}

export function _resetTrails(): void {
  trails.clear();
  nextId = 1;
}
