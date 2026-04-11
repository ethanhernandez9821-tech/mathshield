import GameProgressCard from "@/components/GameProgressCard";
import TopBar from "@/components/TopBar";

export default function DriftBossPage() {
  return (
    <main className="page-shell">
      <TopBar />

      <section className="page-hero">
        <div>
          <p className="section-kicker">Featured Game</p>
          <h1 className="arcade-title">Drift Boss</h1>
          <p className="arcade-copy">
            A clean one-button runner with quick resets and a tighter game frame, so it feels like part of the site
            instead of a random file dropped into it.
          </p>
        </div>
      </section>

      <section className="game-layout">
        <div className="game-frame">
          <div className="game-frame-top">
            <span className="poster-chip">Arcade build</span>
            <span className="frame-status">Embedded and ready</span>
          </div>
          <iframe
            src="/games/drift-boss/index.html"
            title="Drift Boss"
            className="game-embed"
            allowFullScreen
          />
        </div>

        <aside className="note-card">
          <p className="section-kicker">Quick Notes</p>
          <h2>How it plays</h2>
          <p>Tap or click to turn. Let go to straighten out. The loop is simple, so the fun comes from timing.</p>
          <div className="tag-row">
            <span className="tag">Fast restarts</span>
            <span className="tag">One-button control</span>
            <span className="tag">Good for short sessions</span>
          </div>

          <GameProgressCard slug="drift-boss" />
        </aside>
      </section>
    </main>
  );
}
