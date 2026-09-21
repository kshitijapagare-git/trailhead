import { useState } from "react";
import type { Difficulty, Trail, TrailInput, TrailRegion } from "../entities/types";

interface TrailFormProps {
  initialValue?: Trail;
  regions: TrailRegion[];
  onSubmit: (input: TrailInput) => void;
  onCancel?: () => void;
}

const DIFFICULTIES: Difficulty[] = ["easy", "moderate", "hard"];

export function TrailForm({ initialValue, regions, onSubmit, onCancel }: TrailFormProps) {
  const [regionId, setRegionId] = useState(
    initialValue?.regionId ?? regions[0]?.id ?? ""
  );
  const [name, setName] = useState(initialValue?.name ?? "");
  const [location, setLocation] = useState(initialValue?.location ?? "");
  const [distanceKm, setDistanceKm] = useState(String(initialValue?.distanceKm ?? ""));
  const [elevationGainM, setElevationGainM] = useState(
    String(initialValue?.elevationGainM ?? "")
  );
  const [difficulty, setDifficulty] = useState<Difficulty>(initialValue?.difficulty ?? "easy");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      name,
      location,
      distanceKm: Number(distanceKm),
      elevationGainM: Number(elevationGainM),
      difficulty,
      trailRegionId: regionId,
      regionId,
    });
  }

  if (regions.length === 0) {
    return <p className="helper-text">Add a region first to log trails.</p>;
  }

  return (
    <form className="entity-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span className="field-label">
            Name<span className="required">*</span>
          </span>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="field">
          <span className="field-label">
            Location<span className="required">*</span>
          </span>
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <label className="field">
          <span className="field-label">
            Region<span className="required">*</span>
          </span>
          <select value={regionId} onChange={(e) => setRegionId(e.target.value)} required>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="field-label">
            Distance (km)<span className="required">*</span>
          </span>
          <input
            type="number"
            step="0.1"
            min="0"
            value={distanceKm}
            onChange={(e) => setDistanceKm(e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span className="field-label">
            Elevation gain (m)<span className="required">*</span>
          </span>
          <input
            type="number"
            step="1"
            min="0"
            value={elevationGainM}
            onChange={(e) => setElevationGainM(e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span className="field-label">
            Difficulty<span className="required">*</span>
          </span>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-footer">
        <span className="helper-text">
          <span className="required">*</span> Fields marked are required
        </span>
        <div className="form-footer-actions">
          {onCancel && (
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary">
            {initialValue ? "✓ Save changes" : "✓ Create trail"}
          </button>
        </div>
      </div>
    </form>
  );
}
