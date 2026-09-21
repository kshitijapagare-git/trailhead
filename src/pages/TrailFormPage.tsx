import { useNavigate, useParams } from "react-router-dom";
import { TrailForm } from "../components/TrailForm";
import type { Hike, TrailInput } from "../entities/types";
import { createTrail, getTrail, updateTrail } from "../store/trailStore";
import { listRegions } from "../store/regionStore";
import { listHikesByTrail } from "../store/hikeStore";

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

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

  const trailHikes: Hike[] = existing ? listHikesByTrail(existing.id) : [];

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
      {existing && (
        <div className="table-card" style={{ marginTop: "1.25rem" }}>
          <div className="details-card-header">
            <span>🥾</span>
            <span>Hikes on this trail</span>
          </div>
          {trailHikes.length === 0 ? (
            <p className="helper-text" style={{ padding: "16px 20px" }}>
              No hikes logged yet.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {trailHikes.map((hike) => (
                    <tr key={hike.id}>
                      <td>📅 {formatDate(hike.date)}</td>
                      <td>⏱️ {hike.durationMinutes}m</td>
                      <td>{hike.notes || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
