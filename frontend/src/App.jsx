import { useEffect, useState } from "react";
import { api } from "./api";
import { config } from "./config";
import AuthPage from "./components/AuthPage";
import AppShell from "./components/AppShell";
import DashboardPage from "./pages/DashboardPage";
import FormPage from "./pages/FormPage";
import HomePage from "./pages/HomePage";
import RecordsPage from "./pages/RecordsPage";

function currentRoute() {
  const route = window.location.hash.replace("#/", "") || "dashboard";
  const [page, id] = route.split("/");
  return { page, id };
}

export function navigate(path) {
  window.location.hash = `#/${path}`;
}

export default function App() {
  const [route, setRoute] = useState(currentRoute);
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const updateRoute = () => setRoute(currentRoute());
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  useEffect(() => {
    api.auth.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setCheckingSession(false));
  }, []);

  async function logout() {
    try { await api.auth.logout(); } catch { /* Clear the local screen even if the session expired. */ }
    setUser(null);
    navigate("login");
  }

  if (checkingSession) return <div className="app-loading">Loading {config.brand}...</div>;

  if (!user) {
    const mode = route.page === "signup" ? "signup" : "login";
    return <AuthPage mode={mode} notice={notice} onNotice={setNotice} onLogin={setUser} />;
  }

  const pages = ["dashboard", "home", "records", "form"];
  const page = pages.includes(route.page) ? route.page : "dashboard";

  return (
    <AppShell page={page} user={user} onLogout={logout}>
      {page === "dashboard" && <DashboardPage />}
      {page === "home" && <HomePage />}
      {page === "records" && <RecordsPage />}
      {page === "form" && <FormPage recordId={route.id} />}
    </AppShell>
  );
}
