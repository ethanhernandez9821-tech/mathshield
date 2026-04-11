"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthNav from "@/components/AuthNav";

export default function TopBar() {
  const router = useRouter();

  return (
    <div className="utility-bar">
      <div className="utility-left">
        <button onClick={() => router.back()} className="ui-button ui-button--ghost" type="button">
          Back
        </button>
        <Link href="/" className="home-badge">
          MathShield
        </Link>
        <Link href="/arcade" className="mini-nav-link">
          Arcade Lab
        </Link>
        <Link href="/games" className="mini-nav-link">
          Math Lab
        </Link>
        <Link href="/profile" className="mini-nav-link">
          Profile
        </Link>
      </div>

      <AuthNav />
    </div>
  );
}
