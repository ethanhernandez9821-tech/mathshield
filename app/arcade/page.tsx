"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import GameCard from "@/components/GameCard";
import TopBar from "@/components/TopBar";
import { games } from "@/data/games";
import { getDailyFeaturedGame } from "@/lib/featured-game";

export default function ArcadePage() {
  const [search, setSearch] = useState("");
  const featuredGame = getDailyFeaturedGame();

  const arcadeGames = useMemo(() => {
    return games
      .filter((game) => game.category === "arcade")
      .filter((game) => {
        const q = search.toLowerCase().trim();
        if (!q) return true;

        return (
          game.title.toLowerCase().includes(q) ||
          game.description.toLowerCase().includes(q)
        );
      });
  }, [search]);

  return (
    <main className="page-shell">
      <TopBar />

      <section className="arcade-header">
        <div>
          <p className="section-kicker">Arcade Lab</p>
          <h1 className="arcade-title">Arcade lineup</h1>
          <p className="arcade-copy">
            Drift Boss is live, and the rest of the Coolmath-style picks stay in the lineup as planned imports until
            they have real source code behind them.
          </p>
        </div>

        <Link href={`/arcade/${featuredGame.slug}`} className="mini-feature">
          <div className="mini-feature-media">
            <Image
              src={featuredGame.thumbnail}
              alt={`${featuredGame.title} preview`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="mini-feature-copy">
            <span className="poster-chip">Daily feature</span>
            <strong>{featuredGame.title}</strong>
          </div>
        </Link>
      </section>

      <div className="search-bar-wrap">
        <input
          className="ui-input"
          type="text"
          placeholder="Search arcade lab..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <section className="library-grid">
        {arcadeGames.length > 0 ? (
          arcadeGames.map((game) => (
            <GameCard
              key={game.slug}
              slug={game.slug}
              title={game.title}
              description={game.description}
              thumbnail={game.thumbnail}
              category={game.category}
              status={game.status}
            />
          ))
        ) : (
          <div className="empty-library">
            <h2>No arcade matches</h2>
            <p>Try a shorter search.</p>
          </div>
        )}
      </section>
    </main>
  );
}
