"use client";

import { useMemo, useState } from "react";
import GameCard from "@/components/GameCard";
import TopBar from "@/components/TopBar";
import { games } from "@/data/games";

export default function GamesPage() {
  const [search, setSearch] = useState("");

  const mathGames = useMemo(() => {
    return games
      .filter((game) => game.category === "math")
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

      <section className="page-hero page-hero--compact">
        <div>
          <p className="section-kicker">Math Lab</p>
          <h1 className="arcade-title">Math lab games</h1>
          <p className="arcade-copy">
            2048 is live now as a real imported open-source game, and the rest of the logic and math picks stay in the
            queue until they have proper source code.
          </p>
        </div>
      </section>

      <div className="search-bar-wrap">
        <input
          className="ui-input"
          type="text"
          placeholder="Search math lab..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <section className="library-grid">
        {mathGames.length > 0 ? (
          mathGames.map((game) => (
            <GameCard
              key={game.slug}
              slug={game.slug}
              title={game.title}
              description={game.description}
              thumbnail={game.thumbnail}
              hrefBase="/games"
              category={game.category}
              status={game.status}
            />
          ))
        ) : (
          <div className="empty-library">
            <h2>No math lab matches</h2>
            <p>Try a shorter search.</p>
          </div>
        )}
      </section>
    </main>
  );
}
