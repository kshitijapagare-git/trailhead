import { useNavigate, useParams } from "react-router-dom";
import { HikeForm } from "../components/HikeForm";
import type { HikeInput } from "../entities/types";
import { createHike, getHike, updateHike } from "../store/hikeStore";
import { listTrails } from "../store/trailStore";

export function HikeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? getHike(id) : undefined;
  const trails = listTrails();

  if (id && !existing) {
    return <p className="helper-text">Hike not found.</p>;
  }

  function handleSubmit(input: HikeInput) {
    if (existing) {
      updateHike(existing.id, input);
    } else {
      createHike(input);
    }
    navigate("/hikes");
  }

  return (
    <section>
      <div className="form-page-header">
        <button
          type="button"
          className="icon-btn"
          aria-label="Back to hikes"
          onClick={() => navigate("/hikes")}
        >
          ‹
        </button>
        <div>
          <h2>{existing ? "Edit hike" : "New hike"}</h2>
          <p className="helper-text">
            {existing ? "Update this hike's details" : "Log a new hike to your records"}
          </p>
        </div>
      </div>
      <div className="details-card">
        <div className="details-card-header">
          <span>🥾</span>
          <span>Details</span>
        </div>
        <HikeForm
          trails={trails}
          initialValue={existing}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/hikes")}
        />
      </div>
    </section>
  );
}
