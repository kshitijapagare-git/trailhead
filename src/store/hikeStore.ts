import type { Hike, HikeInput } from "../entities/types";
import { getTrail } from "./trailStore";

const hikes = new Map<string, Hike>();
let nextId = 1;

function validateRating(rating: number): void {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be an integer between 1 and 5.");
  }
}

export function createHike(input: HikeInput): Hike {
  if (!getTrail(input.trailId)) {
    throw new Error(`Trail not found: ${input.trailId}`);
  }
  validateRating(input.rating);

  const hike: Hike = { id: String(nextId++), ...input };
  hikes.set(hike.id, hike);
  return hike;
}

export function getHike(id: string): Hike | undefined {
  return hikes.get(id);
}

export function listHikes(): Hike[] {
  return Array.from(hikes.values());
}

export function updateHike(id: string, input: Partial<HikeInput>): Hike | undefined {
  const existing = hikes.get(id);
  if (!existing) return undefined;
  if (input.trailId && !getTrail(input.trailId)) {
    throw new Error(`Trail not found: ${input.trailId}`);
  }
  if (input.rating !== undefined) {
    validateRating(input.rating);
  }

  const updated: Hike = { ...existing, ...input };
  hikes.set(id, updated);
  return updated;
}

export function deleteHike(id: string): boolean {
  return hikes.delete(id);
}

export function _resetHikes(): void {
  hikes.clear();
  nextId = 1;
}
