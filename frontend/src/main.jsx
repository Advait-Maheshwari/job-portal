import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const initialItems = [
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

function App() {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const visible = useMemo(() => items.filter(item => item.name.toLowerCase().includes(query.toLowerCase())), [items, query]);

  function addItem(event) {
    event.preventDefault();
    if (!name.trim()) return;
    setItems([{ id: Date.now(), name: name.trim(), owner: "You", status: "Planned" }, ...items]);
    setName("");
  }

  function nextStatus(id) {
    const flow = { Planned: "Review", Review: "Active", Active: "Closed", Closed: "Planned" };
    setItems(items.map(item => item.id === id ? { ...item, status: flow[item.status] } : item));
  }

  return (
    <main>
      <section className="hero">
        <div className="container py-5">
          <span className="badge text-bg-success mb-3">Recruitment</span>
          <h1 className="display-5 fw-bold">Job Portal</h1>
          <p className="lead text-secondary">Manage jobs with a React and Bootstrap interface backed by Spring Boot and MySQL.</p>
        </div>
      </section>
      <section className="container py-4">
        <div className="toolbar">
          <input className="form-control" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search jobs" />
          <form className="input-group" onSubmit={addItem}>
            <input className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Add jobs" />
            <button className="btn btn-success">Add</button>
          </form>
        </div>
        <div className="row g-3 mt-1">
          {visible.map(item => (
            <div className="col-md-6 col-xl-4" key={item.id}>
              <article className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between gap-3">
                    <h2 className="h5">{item.name}</h2>
                    <span className="badge text-bg-light">{item.status}</span>
                  </div>
                  <p className="text-secondary mb-4">Owner: {item.owner}</p>
                  <button className="btn btn-outline-success btn-sm" onClick={() => nextStatus(item.id)}>Move status</button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
