"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import { signUpUser } from "@/lib/profile-storage";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = signUpUser({ username, email, password });

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
          <p className="section-kicker">Create Your Profile</p>
          <h1 className="arcade-title">Join the lab board.</h1>
          <p className="arcade-copy">
            Create a saved browser account to unlock XP, saved play time, and a default MathShield profile card.
          </p>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="signup-name">
            Username
          </label>
          <input
            id="signup-name"
            className="ui-input"
            type="text"
            placeholder="Pick a username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <label className="field-label" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
            className="ui-input"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label className="field-label" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            className="ui-input"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error ? <p className="form-error">{error}</p> : null}

          <button className="ui-button auth-button" type="submit">
            Create Account
          </button>
        </form>
      </section>
    </main>
  );
}
