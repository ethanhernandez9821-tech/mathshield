"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import { loginUser } from "@/lib/profile-storage";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = loginUser({ identifier, password });

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setError("");
    router.push("/profile");
  };

  return (
    <main className="page-shell">
      <TopBar />

      <section className="auth-layout">
        <div className="auth-copy">
          <p className="section-kicker">Member Access</p>
          <h1 className="arcade-title">Log back into MathShield.</h1>
          <p className="arcade-copy">
            Sign in to track play time, earn XP, and save your profile progress.
          </p>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="login-identifier">
            Username or email
          </label>
          <input
            id="login-identifier"
            className="ui-input"
            type="text"
            placeholder="username or name@example.com"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
          />

          <label className="field-label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            className="ui-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error ? <p className="form-error">{error}</p> : null}

          <button className="ui-button auth-button" type="submit">
            Login
          </button>
        </form>
      </section>
    </main>
  );
}
