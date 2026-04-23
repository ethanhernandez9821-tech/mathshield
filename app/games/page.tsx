import TopBar from "@/components/TopBar";

export default function GamesPage() {
  return (
    <main className="page-shell">
      <TopBar />

      <section className="page-hero page-hero--compact">
        <div>
          <p className="section-kicker">Math Lab</p>
          <h1 className="arcade-title">Math Lab rebuild</h1>
          <p className="arcade-copy">
            The learning side is staying on the site, but the old filler games were cleared out so we can rebuild it with better math and study content.
          </p>
        </div>
      </section>

      <section className="library-grid">
        <article className="empty-library">
          <h2>No live math games right now</h2>
          <p>The arcade has the four active games. Math Lab is being rebuilt before new learning titles go back live.</p>
        </article>

        <article className="info-card">
          <p className="section-kicker">Planned focus</p>
          <h3>Math + study tools</h3>
          <p>Next up is a cleaner set of logic, arithmetic, and classroom-friendly practice games.</p>
        </article>
      </section>
    </main>
  );
}
