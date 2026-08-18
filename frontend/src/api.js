const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api/job-portal/items";

async function request(path = "", options = {}) {
  const response = await fetch(baseUrl + path, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return response.status === 204 ? null : response.json();
}

export const api = {
  list: () => request(),
  create: (item) => request("", { method: "POST", body: JSON.stringify(item) }),
  update: (item) => request(`/${item.id}`, { method: "PUT", body: JSON.stringify(item) }),
  remove: (id) => request(`/${id}`, { method: "DELETE" })
};
