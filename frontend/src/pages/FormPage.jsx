import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { config } from "../config";
import { navigate } from "../App";

function emptyForm() {
  return Object.fromEntries(config.fields.map((field) => [field.name, field.type === "select" ? field.options[0] : ""]));
}

export default function FormPage({ recordId }) {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(Boolean(recordId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const editing = useMemo(() => Boolean(recordId), [recordId]);

  useEffect(() => {
    setError("");
    if (!recordId) { setForm(emptyForm()); setLoading(false); return; }
    setLoading(true);
    api.records.get(recordId).then(setForm).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, [recordId]);

  function update(event) { setForm({ ...form, [event.target.name]: event.target.value }); }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const payload = { ...form, [config.numericField]: Number(form[config.numericField]) };
    try {
      if (editing) await api.records.update(recordId, payload);
      else await api.records.create(payload);
      navigate("records");
    } catch (requestError) { setError(requestError.message); }
    finally { setSaving(false); }
  }

  if (loading) return <p className="empty-state">Loading record...</p>;

  return <section className="form-layout"><div className="page-intro compact"><p className="eyebrow">{editing ? "Update record" : "Create record"}</p><h2>{editing ? "Edit " + config.entity : "New " + config.entity}</h2><p>All fields are validated before the record is saved.</p></div><form className="record-form" onSubmit={submit}>{error && <div className="alert alert-danger" role="alert">{error}</div>}<div className="form-grid">{config.fields.map((field) => <div key={field.name}><label htmlFor={field.name}>{field.label}</label>{field.type === "select" ? <select id={field.name} className="form-select" name={field.name} value={form[field.name] ?? ""} onChange={update} required>{field.options.map((option) => <option key={option}>{option}</option>)}</select> : <input id={field.name} className="form-control" type={field.type} name={field.name} value={form[field.name] ?? ""} onChange={update} placeholder={field.placeholder || ""} min={field.min} minLength={field.minLength} maxLength={field.maxLength} step={field.step} required />}</div>)}</div><div className="form-actions"><button className="btn btn-primary" type="submit" disabled={saving}>{saving ? "Saving..." : editing ? "Save changes" : "Create " + config.entity.toLowerCase()}</button><a className="btn btn-outline-secondary" href="#/records">Cancel</a></div></form></section>;
}
