import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { config } from "../config";

export default function HomePage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.records.list()
      .then(setRecords)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const statusCounts = useMemo(() => Object.fromEntries(
    config.statuses.map((status) => [status, records.filter((record) => record.status === status).length])
  ), [records]);

  return <>
    {error && <div className="alert alert-danger" role="alert">{error}</div>}
    <section className="home-hero">
      <div>
        <p className="eyebrow">Workspace home</p>
        <h2>{config.brand} operations</h2>
        <p>{config.description}</p>
        <div className="home-hero-actions">
          <a className="btn btn-primary" href="#/records">View records</a>
          <a className="btn btn-outline-secondary" href="#/form">{"New " + config.entity}</a>
        </div>
      </div>
      <div className="home-snapshot" aria-label="Current record snapshot">
        <span>Current records</span>
        <strong>{loading ? "..." : records.length}</strong>
        <small>{config.statuses.length} workflow stages</small>
      </div>
    </section>

    <section className="home-actions" aria-labelledby="home-actions-title">
      <div className="section-heading">
        <div><p className="eyebrow">Quick access</p><h2 id="home-actions-title">Daily workspace</h2></div>
      </div>
      <div className="home-action-grid">
        <article><span aria-hidden="true">DB</span><h3>Dashboard</h3><p>Live totals and recent activity.</p><a href="#/dashboard">Open dashboard</a></article>
        <article><span aria-hidden="true">RC</span><h3>{config.entity} records</h3><p>{loading ? "Loading records..." : records.length + " records available"}</p><a href="#/records">Open records</a></article>
        <article><span aria-hidden="true">NW</span><h3>{"New " + config.entity}</h3><p>Validated entry form.</p><a href="#/form">Open form</a></article>
      </div>
    </section>

    <section className="home-panel-grid">
      <article className="home-panel">
        <div className="section-heading"><div><p className="eyebrow">Current queue</p><h2>Workflow status</h2></div><a href="#/records">View all</a></div>
        <div className="workflow-summary">
          {config.statuses.map((status) => <div key={status}><span>{status}</span><strong>{loading ? "-" : statusCounts[status]}</strong></div>)}
        </div>
      </article>
      <article className="home-panel">
        <div className="section-heading"><div><p className="eyebrow">Latest updates</p><h2>Recent {config.entityPlural}</h2></div></div>
        <div className="recent-records">
          {records.slice(0, 4).map((record) => <a key={record.id} href={"#/form/" + record.id}><span><strong>{record[config.primaryField]}</strong><small>{record[config.secondaryField]}</small></span><em>{record.status}</em></a>)}
          {!loading && records.length === 0 && <p className="empty-state">No records available.</p>}
          {loading && <p className="empty-state">Loading recent records...</p>}
        </div>
      </article>
    </section>
  </>;
}
