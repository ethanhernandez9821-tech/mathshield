"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getGameProgress, recordGameplay, type StoredUser } from "@/lib/profile-storage";
import { useCurrentUser } from "@/lib/use-current-user";

const TARGET_SECONDS = 15 * 60;
const SAVE_CHUNK_SECONDS = 5;

function formatPlayTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`;
}

function GameProgressCardInner({
  slug,
  user,
  active,
}: {
  slug: string;
  user: StoredUser | null;
  active: boolean;
}) {
  const storedSeconds = getGameProgress(user, slug).playSeconds;
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const pendingSeconds = useRef(0);

  useEffect(() => {
    if (!user || !active) {
      return;
    }

    const flushProgress = () => {
      if (pendingSeconds.current <= 0) {
        return;
      }

      recordGameplay(slug, pendingSeconds.current);
      pendingSeconds.current = 0;
    };

    const interval = window.setInterval(() => {
      if (document.visibilityState !== "visible" || !document.hasFocus()) {
        return;
      }

      pendingSeconds.current += 1;
      setSessionSeconds((current) => current + 1);

      if (pendingSeconds.current >= SAVE_CHUNK_SECONDS) {
        flushProgress();
      }
    }, 1000);

    return () => {
      window.clearInterval(interval);
      flushProgress();
    };
  }, [active, user, slug]);

  const playSeconds = storedSeconds + sessionSeconds;
  const cappedSeconds = Math.min(playSeconds, TARGET_SECONDS);
  const progressPercent = (cappedSeconds / TARGET_SECONDS) * 100;

  return (
    <div className="challenge-card">
      <div className="challenge-head">
        <div>
          <p className="section-kicker">XP Challenge</p>
          <h3>Play for 15 mins</h3>
        </div>
        <strong>{formatPlayTime(cappedSeconds)}</strong>
      </div>

      <div className="progress-rail">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {user ? (
        <p className="challenge-copy">
          Progress saves automatically while you are signed in, and play time earns XP toward your level.
        </p>
      ) : (
        <p className="challenge-copy">
          <Link href="/login" className="inline-link">
            Sign in
          </Link>{" "}
          to save play time and earn XP.
        </p>
      )}
    </div>
  );
}

export default function GameProgressCard({
  slug,
  active = true,
}: {
  slug: string;
  active?: boolean;
}) {
  const user = useCurrentUser();

  return <GameProgressCardInner key={`${user?.id ?? "guest"}:${slug}:${active ? "active" : "idle"}`} slug={slug} user={user} active={active} />;
}
