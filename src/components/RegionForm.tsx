import { useState } from "react";
import type { TrailRegion, TrailRegionInput } from "../entities/types";

interface RegionFormProps {
  initialValue?: TrailRegion;
  onSubmit: (input: TrailRegionInput) => void;
  onCancel?: () => void;
  error?: string;
}

export const RegionForm = ({
  initialValue,
  onSubmit,
  onCancel,
  error,
}: RegionFormProps) => {
  const [name, setName] = useState(initialValue?.name ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ name });
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
        {error && (
          <div className="helper-text" role="alert" style={{ gridColumn: "span 2" }}>
            {error}
          </div>
        )}
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
            {initialValue ? "✓ Save changes" : "✓ Create region"}
          </button>
        </div>
      </div>
    </form>
  );
};
