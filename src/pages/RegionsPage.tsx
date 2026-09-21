import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteRegion, listRegions } from "../store/regionStore";

export function RegionsPage() {
  const [regions, setRegions] = useState(() => listRegions());

  function handleDelete(id: string) {
    deleteRegion(id);
    setRegions(listRegions());
  }

  return (
    <section>
      <div className="section-header">
        <h2>Regions</h2>
        <Link to="/regions/new" className="btn-primary">
          + Add region
        </Link>
      </div>
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => (
              <tr key={region.id}>
                <td>{region.name}</td>
                <td>
                  <div className="row-actions">
                    <Link
                      to={`/regions/${region.id}/edit`}
                      className="icon-btn"
                      aria-label="Edit region"
                      title="Edit"
                    >
                      ✏️
                    </Link>
                    <button
                      type="button"
                      className="icon-btn danger"
                      aria-label="Delete region"
                      title="Delete"
                      onClick={() => handleDelete(region.id)}
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
