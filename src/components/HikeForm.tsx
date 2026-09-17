import { useState } from "react";
import type { Hike, HikeInput, Trail } from "../entities/types";

interface HikeFormProps {
  trails: Trail[];
  initialValue?: Hike;
  onSubmit: (input: HikeInput) => void;
  onCancel?: () => void;
}

export function HikeForm({ trails, initialValue, onSubmit, onCancel }: HikeFormProps) {
  const [trailId, setTrailId] = useState(initialValue?.trailId ?? trails[0]?.id ?? "");
  const [date, setDate] = useState(initialValue?.date ?? "");
  const [durationMinutes, setDurationMinutes] = useState(
    String(initialValue?.durationMinutes ?? "")
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ trailId, date, durationMinutes: Number(durationMinutes) });
  }

  if (trails.length === 0) {
    return <p className="helper-text">Add a trail first to log a hike.</p>;
  }

  return (
    <form className="entity-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span className="field-label">
            Trail<span className="required">*</span>
          </span>
          <select value={trailId} onChange={(e) => setTrailId(e.target.value)}>
            {trails.map((trail) => (
              <option key={trail.id} value={trail.id}>
                {trail.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="field-label">
            Date<span className="required">*</span>
          </span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label className="field">
          <span className="field-label">
            Duration (min)<span className="required">*</span>
          </span>
          <input
            type="number"
            min="1"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            required
          />
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
            {initialValue ? "✓ Save changes" : "✓ Create hike"}
          </button>
        </div>
      </div>
    </form>
  );
}
