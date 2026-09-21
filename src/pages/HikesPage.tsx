import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteHike, listHikes } from "../store/hikeStore";
import { getTrail } from "../store/trailStore";

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function HikesPage() {
  const [hikes, setHikes] = useState(() => listHikes());

  function handleDelete(id: string) {
    deleteHike(id);
    setHikes(listHikes());
  }

  return (
    <section>
      <div className="section-header">
        <h2>Hikes</h2>
        <Link to="/hikes/new" className="btn-primary">
          + Log hike
        </Link>
      </div>
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Trail</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Rating</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hikes.map((hike) => (
              <tr key={hike.id}>
                <td>{getTrail(hike.trailId)?.name ?? "Unknown trail"}</td>
                <td>📅 {formatDate(hike.date)}</td>
                <td>⏱️ {formatDuration(hike.durationMinutes)}</td>
                <td>⭐ {hike.rating}</td>
                <td>{hike.notes || "—"}</td>
                <td>
                  <div className="row-actions">
                    <Link
                      to={`/hikes/${hike.id}/edit`}
                      className="icon-btn"
                      aria-label="Edit hike"
                      title="Edit"
                    >
                      ✏️
                    </Link>
                    <button
                      type="button"
                      className="icon-btn danger"
                      aria-label="Delete hike"
                      title="Delete"
                      onClick={() => handleDelete(hike.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-footer">
        <span>Page 1</span>
        <div className="row-actions">
          <button type="button" className="icon-btn" disabled aria-label="Previous page">
            ‹
          </button>
          <button type="button" className="icon-btn" disabled aria-label="Next page">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
