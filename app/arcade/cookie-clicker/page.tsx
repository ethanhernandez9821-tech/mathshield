import Link from "next/link";
import TopBar from "@/components/TopBar";

export default function CookieClickerPage() {
  return (
    <main className="page-shell">
      <TopBar />

      <section className="page-hero">
        <div>
          <p className="section-kicker">Official Launcher</p>
          <h1 className="arcade-title">Cookie Clicker</h1>
          <p className="arcade-copy">
            This opens the real official Cookie Clicker on DashNet instead of mirroring Orteil&apos;s files inside MathShield.
          </p>
        </div>
      </section>

      <section className="game-layout">
        <div className="game-frame">
          <div className="game-frame-top">
            <div className="game-frame-meta">
              <span className="poster-chip">Official site</span>
              <span className="frame-status">External</span>
            </div>
            <div className="game-frame-actions">
              <a
                href="https://orteil.dashnet.org/cookieclicker/"
                target="_blank"
                rel="noreferrer"
                className="ui-button"
              >
                Open Cookie Clicker
              </a>
            </div>
          </div>

          <div className="game-launch">
            <div
              className="game-launch-media"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(10, 12, 16, 0.12), rgba(10, 12, 16, 0.7)), url(/thumbnails/cookie-clicker-official.svg)",
              }}
            />
            <div className="game-launch-copy">
              <h2>Official game only</h2>
              <p>
                Cookie Clicker is not an open-source import in this repo, so this page launches the real official version
                instead of a copied mirror.
              </p>
              <div className="game-frame-actions">
                <a
                  href="https://orteil.dashnet.org/cookieclicker/"
                  target="_blank"
                  rel="noreferrer"
                  className="ui-button"
                >
                  Launch official site
                </a>
                <Link href="/arcade" className="ui-button ui-button--ghost">
                  Back to arcade
                </Link>
              </div>
            </div>
          </div>
        </div>

        <aside className="note-card">
          <p className="section-kicker">About</p>
          <h2>Official launch only</h2>
          <p>
            The live Cookie Clicker game is on DashNet. This page keeps the launch legal and direct instead of pretending
            it is a self-hosted open-source import.
          </p>
          <div className="tag-row">
            <span className="tag">Official DashNet</span>
            <span className="tag">Idle game</span>
            <span className="tag">External launch</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
