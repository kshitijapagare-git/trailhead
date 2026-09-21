import { useNavigate, useParams } from "react-router-dom";
import { TrailForm } from "../components/TrailForm";
import type { TrailInput } from "../entities/types";
import { createTrail, getTrail, updateTrail } from "../store/trailStore";
import { listRegions } from "../store/regionStore";

export function TrailFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? getTrail(id) : undefined;
  const regions = listRegions();

  if (id && !existing) {
    return <p className="helper-text">Trail not found.</p>;
  }

  if (regions.length === 0) {
    return <p className="helper-text">Add a region first to log trails.</p>;
  }

  function handleSubmit(input: TrailInput) {
    if (existing) {
      updateTrail(existing.id, input);
    } else {
      createTrail(input);
    }
    navigate("/trails");
  }

  return (
    <section>
      <div className="form-page-header">
        <button
          type="button"
          className="icon-btn"
          aria-label="Back to trails"
          onClick={() => navigate("/trails")}
        >
          ‹
        </button>
        <div>
          <h2>{existing ? "Edit trail" : "New trail"}</h2>
          <p className="helper-text">
            {existing ? "Update this trail's details" : "Add a new trail to your records"}
          </p>
        </div>
      </div>
      <div className="details-card">
        <div className="details-card-header">
          <span>🗺️</span>
          <span>Details</span>
        </div>
        <TrailForm
          initialValue={existing}
          regions={regions}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/trails")}
        />
      </div>
    </section>
  );
}
