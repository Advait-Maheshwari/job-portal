const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
let csrfToken = "";

async function ensureCsrf() {
  if (csrfToken) return csrfToken;
  const response = await fetch(`${apiBase}/auth/csrf`, { credentials: "include" });
  if (!response.ok) throw new Error("Could not connect to the backend.");
  csrfToken = (await response.json()).token;
  return csrfToken;
}

async function request(path, options = {}, retry = true) {
  const method = options.method || "GET";
  const headers = { "Content-Type": "application/json", ...options.headers };
  if (method !== "GET") headers["X-XSRF-TOKEN"] = await ensureCsrf();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(apiBase + path, {
      ...options,
      method,
      headers,
      credentials: "include",
      signal: controller.signal
    });

    if (response.status === 403 && method !== "GET" && retry) {
      csrfToken = "";
      return request(path, options, false);
    }

    const contentType = response.headers.get("content-type") || "";
    const data = response.status === 204 ? null : contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const error = new Error(data?.message || data || "Request failed.");
      error.status = response.status;
      error.fields = data?.fieldErrors || {};
      throw error;
    }
    return data;
  } catch (error) {
    if (error.name === "AbortError") throw new Error("The request timed out. Check the backend and try again.");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export const api = {
  auth: {
    me: () => request("/auth/me"),
    login: (credentials) => request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
    signup: (account) => request("/auth/signup", { method: "POST", body: JSON.stringify(account) }),
    logout: async () => {
      try { return await request("/auth/logout", { method: "POST" }); }
      finally { csrfToken = ""; }
    }
  },
  records: {
    list: (search = "") => request(`/jobs?search=${encodeURIComponent(search)}`),
    get: (id) => request(`/jobs/${id}`),
    create: (record) => request("/jobs", { method: "POST", body: JSON.stringify(record) }),
    update: (id, record) => request(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(record) }),
    remove: (id) => request(`/jobs/${id}`, { method: "DELETE" })
  }
};
