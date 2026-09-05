import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { config } from "../config";

function formatMetric(value) {
  return config.numericFormat === "currency"
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value)
    : new Intl.NumberFormat("en-IN").format(value);
}

export default function DashboardPage() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => { api.records.list().then(setRecords).catch((requestError) => setError(requestError.message)); }, []);

  const summary = useMemo(() => {
    const active = records.filter((record) => record.status === config.statuses[1]).length;
    const totalValue = records.reduce((sum, record) => sum + Number(record[config.numericField] || 0), 0);
    return { total: records.length, active, totalValue };
  }, [records]);

  return <>{error && <div className="alert alert-danger" role="alert">{error}</div>}<section className="welcome-band"><div><p className="eyebrow">Operations overview</p><h2>{config.brand} dashboard</h2><p>Current information from the Spring Boot API and MySQL database.</p></div><a className="btn btn-light" href="#/form">Add {config.entity.toLowerCase()}</a></section><section className="stats-grid"><article className="stat-card blue"><strong>{summary.total}</strong><span>Total records</span></article><article className="stat-card green"><strong>{summary.active}</strong><span>{config.statuses[1]}</span></article><article className="stat-card amber"><strong>{formatMetric(summary.totalValue)}</strong><span>Total {config.fields.find((field) => field.name === config.numericField).label.toLowerCase()}</span></article><article className="stat-card violet"><strong>{config.statuses.length}</strong><span>Workflow states</span></article></section><section className="section-block"><div className="section-heading"><div><p className="eyebrow">Recently updated</p><h2>{config.entity} activity</h2></div><a href="#/records">View all</a></div><div className="activity-list">{records.slice(0, 5).map((record) => <div key={record.id}><span><strong>{record[config.primaryField]}</strong><small>{record[config.secondaryField]}</small></span><span className="status-badge">{record.status}</span></div>)}{!records.length && !error && <p className="empty-state">No records yet. Create the first one.</p>}</div></section></>;
}
