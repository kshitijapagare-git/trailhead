import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { RegionForm } from "../components/RegionForm";
import type { TrailRegionInput } from "../entities/types";
import { createRegion, getRegion, updateRegion } from "../store/regionStore";

export function RegionFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? getRegion(id) : undefined;
  const [error, setError] = useState<string>("");

  if (id && !existing) {
    return <p className="helper-text">Region not found.</p>;
  }

  function handleSubmit(input: TrailRegionInput) {
    try {
      if (existing) {
        updateRegion(existing.id, input);
      } else {
        createRegion(input);
      }
      navigate("/regions");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to save region.";
      setError(message);
    }
  }

  return (
    <section>
      <div className="form-page-header">
        <button
          type="button"
          className="icon-btn"
          aria-label="Back to regions"
          onClick={() => navigate("/regions")}
        >
          ‹
        </button>
        <div>
          <h2>{existing ? "Edit region" : "New region"}</h2>
          <p className="helper-text">
            {existing ? "Update this region's details" : "Add a new region to your records"}
          </p>
        </div>
      </div>
      <div className="details-card">
        <div className="details-card-header">
          <span>🗺️</span>
          <span>Details</span>
        </div>
        <RegionForm
          initialValue={existing}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/regions")}
          error={error || undefined}
        />
      </div>
    </section>
  );
}
