import { useEffect, useState } from "react";
import { api } from "../api";
import { config } from "../config";

function formatValue(field, value) {
  if (field.name !== config.numericField) return value;
  return config.numericFormat === "currency"
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value)
    : new Intl.NumberFormat("en-IN").format(value);
}

export default function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load(search = query) {
    setLoading(true);
    setError("");
    try { setRecords(await api.records.list(search)); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(""); }, []);

  async function remove(record) {
    if (!window.confirm("Delete " + record[config.primaryField] + "?")) return;
    try { await api.records.remove(record.id); setRecords(records.filter((item) => item.id !== record.id)); }
    catch (requestError) { setError(requestError.message); }
  }

  return <section className="section-block records-block"><div className="section-heading records-heading"><div><p className="eyebrow">CRUD workspace</p><h2>{config.entity} records</h2><p>Create, search, edit and delete records stored in MySQL.</p></div><a className="btn btn-primary" href="#/form">Add {config.entity}</a></div><form className="search-row" onSubmit={(event) => { event.preventDefault(); load(); }}><label htmlFor="record-search">Search records</label><div><input id="record-search" className="form-control" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={"Search " + config.entityPlural} /><button className="btn btn-outline-secondary" type="submit">Search</button><button className="btn btn-outline-secondary" type="button" onClick={() => { setQuery(""); load(""); }}>Reset</button></div></form>{error && <div className="alert alert-danger" role="alert">{error}</div>}{loading ? <p className="empty-state">Loading records...</p> : records.length === 0 ? <p className="empty-state">No records found.</p> : <div className="table-responsive"><table className="table align-middle"><thead><tr>{config.fields.map((field) => <th key={field.name}>{field.label}</th>)}<th>Actions</th></tr></thead><tbody>{records.map((record) => <tr key={record.id}>{config.fields.map((field) => <td key={field.name}>{field.name === "status" ? <span className="status-badge">{record.status}</span> : formatValue(field, record[field.name])}</td>)}<td><div className="table-actions"><a className="btn btn-sm btn-outline-primary" href={"#/form/" + record.id}>Edit</a><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => remove(record)}>Delete</button></div></td></tr>)}</tbody></table></div>}</section>;
}
