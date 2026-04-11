"use client";

import Image from "next/image";
import Link from "next/link";
import { getLevelFromXp, logoutUser } from "@/lib/profile-storage";
import { useCurrentUser } from "@/lib/use-current-user";

export default function AuthNav() {
  const user = useCurrentUser();

  if (!user) {
    return (
      <div className="auth-nav">
        <Link href="/login" className="ui-button ui-button--ghost">
          Login
        </Link>
        <Link href="/signup" className="ui-button">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-nav">
      <Link href="/profile" className="profile-nav-link">
        <Image
          src={user.avatarUrl}
          alt={`${user.username} avatar`}
          width={32}
          height={32}
          className="profile-nav-avatar"
        />
        <span className="profile-nav-meta">
          <strong>{user.username}</strong>
          <span>Level {getLevelFromXp(user.xp)}</span>
        </span>
      </Link>

      <button className="ui-button ui-button--ghost" type="button" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
}
