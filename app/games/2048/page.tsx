import GameProgressCard from "@/components/GameProgressCard";
import TopBar from "@/components/TopBar";

export default function Game2048Page() {
  return (
    <main className="page-shell">
      <TopBar />

      <section className="page-hero">
        <div>
          <p className="section-kicker">Imported Open-Source Game</p>
          <h1 className="arcade-title">2048</h1>
          <p className="arcade-copy">
            A real imported browser game, self-hosted inside MathShield. This one uses the original open-source web
            codebase instead of a homemade placeholder.
          </p>
        </div>
      </section>

      <section className="game-layout">
        <div className="game-frame">
          <div className="game-frame-top">
            <span className="poster-chip">MIT licensed</span>
            <span className="frame-status">Imported and playable</span>
          </div>
          <iframe
            src="/games/2048/index.html"
            title="2048"
            className="game-embed"
            allowFullScreen
          />
        </div>

        <aside className="note-card">
          <p className="section-kicker">Quick Notes</p>
          <h2>How it plays</h2>
          <p>Use the arrow keys to slide the tiles. Matching numbers merge, and your goal is to reach the 2048 tile.</p>
          <div className="tag-row">
            <span className="tag">Arrow keys</span>
            <span className="tag">Puzzle</span>
            <span className="tag">Imported source</span>
          </div>
          <GameProgressCard slug="2048" />
          <p className="challenge-copy">
            Source: Gabriele Cirulli’s open-source 2048 project, self-hosted here under the MIT license.
          </p>
        </aside>
      </section>
    </main>
  );
}
