import { useEffect, useMemo, useState } from "react";
import { api } from "./api";

const emptyForm = { id: null, name: "", owner: "", status: "Planned" };
const statusFlow = { Planned: "Review", Review: "Active", Active: "Closed", Closed: "Planned" };

export default function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const visibleItems = useMemo(
    () => items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      setLoading(true);
      setItems(await api.list());
      setError("");
    } catch {
      setError("Backend is not running or database connection failed.");
    } finally {
      setLoading(false);
    }
  }

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function validateForm() {
    if (form.name.trim().length < 2) return "Name must contain at least 2 characters.";
    if (form.owner.trim().length < 2) return "Owner must contain at least 2 characters.";
    return "";
  }

  async function saveItem(event) {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) return setError(validationError);

    const item = { ...form, name: form.name.trim(), owner: form.owner.trim() };
    try {
      const saved = item.id ? await api.update(item) : await api.create(item);
      setItems(item.id ? items.map((row) => row.id === saved.id ? saved : row) : [saved, ...items]);
      setForm(emptyForm);
      setError("");
    } catch {
      setError("Could not save the record. Please check the backend.");
    }
  }

  async function moveStatus(item) {
    const updated = { ...item, status: statusFlow[item.status] };
    try {
      const saved = await api.update(updated);
      setItems(items.map((row) => row.id === saved.id ? saved : row));
    } catch {
      setError("Could not update the status.");
    }
  }

  async function deleteItem(id) {
    if (!confirm("Delete this record?")) return;
    try {
      await api.remove(id);
      setItems(items.filter((item) => item.id !== id));
    } catch {
      setError("Could not delete the record.");
    }
  }

  return (
    <main>
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home">Job Portal</a>
          <div className="navbar-nav flex-row gap-3">
            <a className="nav-link" href="#records">Records</a>
            <a className="nav-link" href="#form">Form</a>
          </div>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="container py-5">
          <span className="badge text-bg-success mb-3">Recruitment</span>
          <h1 className="display-5 fw-bold">Job Portal</h1>
          <p className="lead text-secondary">Manage jobs with React, Bootstrap, Spring Boot, and MySQL.</p>
        </div>
      </section>

      <section className="container py-4">
        {error && <div className="alert alert-warning">{error}</div>}
        <div className="row g-4">
          <div className="col-lg-4" id="form">
            <form className="panel" onSubmit={saveItem}>
              <h2 className="h5 mb-3">{form.id ? "Edit Record" : "Add Record"}</h2>
              <label className="form-label">Name</label>
              <input className="form-control mb-3" name="name" value={form.name} onChange={updateForm} placeholder="Enter name" />
              <label className="form-label">Owner</label>
              <input className="form-control mb-3" name="owner" value={form.owner} onChange={updateForm} placeholder="Enter owner" />
              <label className="form-label">Status</label>
              <select className="form-select mb-3" name="status" value={form.status} onChange={updateForm}>
                <option>Planned</option>
                <option>Review</option>
                <option>Active</option>
                <option>Closed</option>
              </select>
              <div className="d-flex gap-2">
                <button className="btn btn-success" type="submit">{form.id ? "Update" : "Add"}</button>
                {form.id && <button className="btn btn-outline-secondary" type="button" onClick={() => setForm(emptyForm)}>Cancel</button>}
              </div>
            </form>
          </div>

          <div className="col-lg-8" id="records">
            <div className="panel">
              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                <h2 className="h5 mb-0">Jobs</h2>
                <input className="form-control search-box" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search records" />
              </div>

              {loading ? (
                <p className="text-secondary mb-0">Loading records...</p>
              ) : visibleItems.length === 0 ? (
                <p className="text-secondary mb-0">No records found.</p>
              ) : (
                <div className="row g-3">
                  {visibleItems.map((item) => (
                    <div className="col-md-6" key={item.id}>
                      <article className="record-card">
                        <div className="d-flex justify-content-between gap-3">
                          <h3 className="h6">{item.name}</h3>
                          <span className="badge text-bg-light">{item.status}</span>
                        </div>
                        <p className="text-secondary mb-3">Owner: {item.owner}</p>
                        <div className="d-flex flex-wrap gap-2">
                          <button className="btn btn-outline-success btn-sm" onClick={() => moveStatus(item)}>Move status</button>
                          <button className="btn btn-outline-primary btn-sm" onClick={() => setForm(item)}>Edit</button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => deleteItem(item.id)}>Delete</button>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
