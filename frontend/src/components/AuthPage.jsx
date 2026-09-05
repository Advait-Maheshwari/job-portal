import { useEffect, useState } from "react";
import { api } from "../api";
import { config } from "../config";
import { navigate } from "../App";

export default function AuthPage({ mode, notice, onNotice, onLogin }) {
  const signup = mode === "signup";
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm({ fullName: "", email: "", password: "" });
    setError("");
  }, [mode]);

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    onNotice("");
    try {
      if (signup) {
        await api.auth.signup(form);
        onNotice("Account created. Log in with your new credentials.");
        navigate("login");
      } else {
        const user = await api.auth.login({ email: form.email, password: form.password });
        onLogin(user);
        navigate("dashboard");
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-page" style={{ "--primary": config.colors.primary, "--primary-dark": config.colors.primaryDark, "--sidebar": config.colors.sidebar }}>
      <section className="auth-intro" aria-label={config.title + " introduction"}>
        <a className="brand-lockup" href="#/login"><span className="brand-mark" aria-hidden="true">{config.brand.slice(0, 2).toUpperCase()}</span><span>{config.brand}</span></a>
        <div className="auth-copy"><p className="eyebrow">{config.title}</p><h1>{config.description}</h1><p>Secure access to connected dashboards, records and CRUD workflows.</p></div>
        <small>React + Spring Boot + MySQL</small>
      </section>

      <section className="auth-form-wrap">
        <form className="auth-form" onSubmit={submit}>
          <p className="eyebrow">Secure access</p>
          <h2>{signup ? "Create account" : "Log in to " + config.brand}</h2>
          <p className="form-intro">{signup ? "Create an account to access the workspace." : "Enter your account details to continue."}</p>

          {notice && !signup && <div className="alert alert-success" role="status">{notice}</div>}
          {error && <div className="alert alert-danger" role="alert">{error}</div>}

          {signup && <div className="field"><label htmlFor="fullName">Full name</label><input id="fullName" className="form-control" name="fullName" value={form.fullName} onChange={update} minLength="2" maxLength="80" autoComplete="name" required /></div>}
          <div className="field"><label htmlFor="email">Email address</label><input id="email" className="form-control" type="email" name="email" value={form.email} onChange={update} maxLength="120" autoComplete="email" required /></div>
          <div className="field"><label htmlFor="password">Password</label><div className="input-group"><input id="password" className="form-control" type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={update} minLength="8" maxLength="72" autoComplete={signup ? "new-password" : "current-password"} required /><button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button></div></div>
          <button className="btn btn-primary submit-button" type="submit" disabled={submitting}>{submitting ? "Please wait..." : signup ? "Create account" : "Log in"}</button>

          {!signup && <div className="demo-login"><strong>Demo login</strong><span>admin@demo.com</span><span>Admin@123</span></div>}
          <p className="auth-switch">{signup ? "Already have an account?" : "New to the system?"} <a href={signup ? "#/login" : "#/signup"}>{signup ? "Log in" : "Sign up"}</a></p>
        </form>
      </section>
    </main>
  );
}
