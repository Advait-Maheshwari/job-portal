import { useEffect, useMemo, useState } from "react";
import { api } from "./api";

const fallbackItems = [
  {
    "id": 1,
    "name": "Java Developer",
    "owner": "Admin",
    "status": "Active"
  },
  {
    "id": 2,
    "name": "React Engineer",
    "owner": "Manager",
    "status": "Review"
  },
  {
    "id": 3,
    "name": "Spring Boot Intern",
    "owner": "Team",
    "status": "Planned"
  }
];
const next = { Planned: "Review", Review: "Active", Active: "Closed", Closed: "Planned" };

export default function App() {
  const [items, setItems] = useState(fallbackItems);
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())), [items, query]);

  useEffect(() => { api.list().then(setItems).catch(() => setItems(fallbackItems)); }, []);

  async function addItem(event) {
    event.preventDefault();
    if (!name.trim()) return;
    const draft = { name: name.trim(), owner: "You", status: "Planned" };
    setItems([await api.create(draft).catch(() => ({ ...draft, id: Date.now() })), ...items]);
    setName("");
  }

  async function moveStatus(item) {
    const updated = { ...item, status: next[item.status] };
    setItems(items.map((row) => row.id === item.id ? updated : row));
    api.update(updated).catch(() => null);
  }

  return (
    <main>
      <section className="hero">
        <div className="container py-5">
          <span className="badge text-bg-success mb-3">Recruitment</span>
          <h1 className="display-5 fw-bold">Job Portal</h1>
          <p className="lead text-secondary">Manage jobs with a clean React, Bootstrap, Spring Boot, and MySQL stack.</p>
        </div>
      </section>

      <section className="container py-4">
        <div className="toolbar">
          <input className="form-control" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search jobs" />
          <form className="input-group" onSubmit={addItem}>
            <input className="form-control" value={name} onChange={(event) => setName(event.target.value)} placeholder="Add jobs" />
            <button className="btn btn-success">Add</button>
          </form>
        </div>

        <div className="row g-3 mt-1">
          {visible.map((item) => (
            <div className="col-md-6 col-xl-4" key={item.id}>
              <article className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between gap-3">
                    <h2 className="h5">{item.name}</h2>
                    <span className="badge text-bg-light">{item.status}</span>
                  </div>
                  <p className="text-secondary mb-4">Owner: {item.owner}</p>
                  <button className="btn btn-outline-success btn-sm" onClick={() => moveStatus(item)}>Move status</button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
