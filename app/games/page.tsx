import TopBar from "@/components/TopBar";

export default function GamesPage() {
  return (
    <main className="page-shell">
      <TopBar />

      <section className="page-hero page-hero--compact">
        <div>
          <p className="section-kicker">Math Lab</p>
          <h1 className="arcade-title">Math lab roadmap</h1>
          <p className="arcade-copy">This page tracks the next math games coming into MathShield.</p>
        </div>
      </section>

      <section className="roadmap-grid">
        <article className="roadmap-card roadmap-card--cyan">
          <p className="section-kicker">Planned Modules</p>
          <h2>Speed math rounds</h2>
          <p>Quick score-based drills designed for fast practice and easy replay.</p>
        </article>

        <article className="roadmap-card roadmap-card--orange">
          <p className="section-kicker">Build Queue</p>
          <h2>Logic and pattern games</h2>
          <p>Reasoning-first challenges are next once the current arcade polish is settled.</p>
        </article>
      </section>
    </main>
  );
}
