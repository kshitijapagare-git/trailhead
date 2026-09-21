import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteTrail, listTrails } from "../store/trailStore";
import { getRegion } from "../store/regionStore";

export function TrailsPage() {
  const [trails, setTrails] = useState(() => listTrails());

  function handleDelete(id: string) {
    deleteTrail(id);
    setTrails(listTrails());
  }

  return (
    <section>
      <div className="section-header">
        <h2>Trails</h2>
        <Link to="/trails/new" className="btn-primary">
          + Add trail
        </Link>
      </div>
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Region</th>
              <th>Location</th>
              <th>Distance</th>
              <th>Elevation</th>
              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {trails.map((trail) => (
              <tr key={trail.id}>
                <td>{trail.name}</td>
                <td>{getRegion(trail.regionId)?.name ?? "Unknown region"}</td>
                <td>📍 {trail.location}</td>
                <td>📏 {trail.distanceKm} km</td>
                <td>⛰️ {trail.elevationGainM} m</td>
                <td>
                  <span className={`badge badge-${trail.difficulty}`}>{trail.difficulty}</span>
                </td>
                <td>
                  <div className="row-actions">
                    <Link
                      to={`/trails/${trail.id}/edit`}
                      className="icon-btn"
                      aria-label="Edit trail"
                      title="Edit"
                    >
                      ✏️
                    </Link>
                    <button
                      type="button"
                      className="icon-btn danger"
                      aria-label="Delete trail"
                      title="Delete"
                      onClick={() => handleDelete(trail.id)}
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
