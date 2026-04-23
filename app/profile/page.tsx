"use client";

import Image from "next/image";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import { getGameProgress, getLevelMeta } from "@/lib/profile-storage";
import { useCurrentUser } from "@/lib/use-current-user";

function formatMinutes(seconds: number) {
  return `${Math.floor(seconds / 60)} min`;
}

export default function ProfilePage() {
  const user = useCurrentUser();

  if (!user) {
    return (
      <main className="page-shell">
        <TopBar />

        <section className="profile-empty">
          <p className="section-kicker">Profile Locked</p>
          <h1 className="arcade-title">Sign in to start earning XP.</h1>
          <p className="arcade-copy">
            XP, levels, and saved challenge progress only work when you are logged into a MathShield account.
          </p>
          <div className="action-row">
            <Link href="/login" className="ui-button">
              Login
            </Link>
            <Link href="/signup" className="ui-button ui-button--ghost">
              Sign Up
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const levelMeta = getLevelMeta(user.xp);
  const threeFpsProgress = getGameProgress(user, "three-fps");
  const threeFpsProgressPercent = Math.min(100, (threeFpsProgress.playSeconds / 900) * 100);

  return (
    <main className="page-shell">
      <TopBar />

      <section className="profile-layout">
        <section className="profile-hero">
          <div className="profile-avatar-frame">
            <Image src={user.avatarUrl} alt={`${user.username} avatar`} width={88} height={88} />
          </div>

          <div className="profile-main">
            <p className="section-kicker">Player Profile</p>
            <h1 className="arcade-title">{user.username}</h1>
            <p className="arcade-copy">{user.email}</p>
            <div className="profile-badges">
              <span className="tag">Default avatar</span>
              <span className="tag">Level {levelMeta.level}</span>
              <span className="tag">{user.xp} XP</span>
            </div>
          </div>
        </section>

        <section className="profile-grid">
          <article className="xp-card">
            <p className="section-kicker">Level Progress</p>
            <h2>Level {levelMeta.level}</h2>
            <p>{levelMeta.currentXp} / {levelMeta.neededXp} XP to the next level</p>
            <div className="progress-rail">
              <div className="progress-fill" style={{ width: `${levelMeta.progressPercent}%` }} />
            </div>
          </article>

          <article className="stat-card">
            <p className="section-kicker">Three FPS</p>
            <h2>{formatMinutes(threeFpsProgress.playSeconds)}</h2>
            <p>Total tracked play time while signed in.</p>
          </article>

          <article className="stat-card">
            <p className="section-kicker">15 Minute Goal</p>
            <h2>{Math.round(threeFpsProgressPercent)}%</h2>
            <p>Your saved progress toward the current Three FPS play challenge.</p>
            <div className="progress-rail">
              <div className="progress-fill" style={{ width: `${threeFpsProgressPercent}%` }} />
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
