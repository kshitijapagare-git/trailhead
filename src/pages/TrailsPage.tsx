import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTrail, listTrails } from "../store/trailStore";
import { getRegion } from "../store/regionStore";

type TrailSortField = "distanceKm" | "elevationGainM";

type SortDirection = "asc" | "desc";

export function TrailsPage() {
  const [trails, setTrails] = useState(() => listTrails());

  const [sortField, setSortField] = useState<TrailSortField>("distanceKm");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  function toggleSort(field: TrailSortField) {
    if (field === sortField) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  const sortedTrails = useMemo(() => {
    const next = [...trails];
    next.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      const delta = aValue - bValue;
      return sortDirection === "asc" ? delta : -delta;
    });
    return next;
  }, [trails, sortDirection, sortField]);

  function handleDelete(id: string) {
    deleteTrail(id);
    setTrails(listTrails());
  }

  const distanceSortIndicator =
    sortField === "distanceKm" ? (sortDirection === "asc" ? " ↑" : " ↓") : "";
  const elevationSortIndicator =
    sortField === "elevationGainM" ? (sortDirection === "asc" ? " ↑" : " ↓") : "";

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
              <th>
                <span
                  className="sortable-header"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleSort("distanceKm")}
                >
                  Distance{distanceSortIndicator}
                </span>
              </th>
              <th>
                <span
                  className="sortable-header"
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleSort("elevationGainM")}
                >
                  Elevation{elevationSortIndicator}
                </span>
              </th>
              <th>Difficulty</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTrails.map((trail) => (
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
