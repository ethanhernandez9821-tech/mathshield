import Image from "next/image";
import Link from "next/link";
import AuthNav from "@/components/AuthNav";
import { getDailyFeaturedGame } from "@/lib/featured-game";

export default function Home() {
  const featuredGame = getDailyFeaturedGame();

  return (
    <main className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand-lockup">
          <span className="brand-mini">MathShield</span>
          <span className="brand-sub">Student Learning Hub</span>
        </Link>

        <nav className="primary-nav">
          <Link href="/arcade" className="nav-pill nav-pill--active">
            Arcade Lab
          </Link>
          <Link href="/games" className="nav-pill">
            Math Lab
          </Link>
          <Link href="/profile" className="nav-pill">
            Profile
          </Link>
        </nav>

        <AuthNav />
      </header>

      <section className="dashboard-grid">
        <div className="dashboard-stack">
          <section className="welcome-panel">
            <p className="section-kicker">Quick Start</p>
            <h1 className="dashboard-title">Open a game fast.</h1>
            <p className="dashboard-copy">
              MathShield is focused on a tighter arcade set right now, with the math side being rebuilt into a cleaner learning lab next.
            </p>

            <div className="action-row">
              <Link href="/arcade" className="ui-button">
                Go To Arcade Lab
              </Link>
              <Link href="/games" className="ui-button ui-button--ghost">
                Go To Math Lab
              </Link>
              <Link href="/profile" className="ui-button ui-button--ghost">
                Open Profile
              </Link>
            </div>
          </section>

          <div className="quick-grid">
            <Link href="/arcade" className="quick-link quick-link--arcade">
              <p className="section-kicker">Arcade Lab</p>
              <h2>Arcade games</h2>
              <p>Four live imported games: 3 FPS, HexGL, Drift Boss, and VibeFPS.</p>
            </Link>

            <Link href="/games" className="quick-link quick-link--math">
              <p className="section-kicker">Math Lab</p>
              <h2>Math games</h2>
              <p>The learning side is still here, but it is being rebuilt instead of padded with filler.</p>
            </Link>
          </div>

          <div className="info-strip">
            <article className="info-card">
              <p className="section-kicker">Today</p>
              <h3>{featuredGame.title}</h3>
              <p>A rotating pick from the four-game arcade lineup.</p>
            </article>

            <article className="info-card">
              <p className="section-kicker">Lineup</p>
              <h3>3 FPS + VibeFPS</h3>
              <p>Two shooters stay live, while Drift Boss and HexGL cover driving and racing.</p>
            </article>

            <article className="info-card">
              <p className="section-kicker">Math Lab</p>
              <h3>Rebuild in progress</h3>
              <p>Study and math tools are being rebuilt before more titles go back on the site.</p>
            </article>
          </div>
        </div>

        <aside className="side-stack">
          <section className="featured-panel">
            <div className="featured-panel-copy">
              <p className="section-kicker">Daily Featured Arcade</p>
              <h2>{featuredGame.title}</h2>
              <p>{featuredGame.description}</p>
              <span className="daily-badge">Resets daily</span>
            </div>

            <Link href={`/arcade/${featuredGame.slug}`} className="featured-poster">
              <div className="featured-poster-media">
                <Image
                  src={featuredGame.thumbnail}
                  alt={`${featuredGame.title} cover art`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="featured-poster-footer">
                <span className="poster-chip">Featured arcade</span>
                <span className="poster-action">Launch</span>
              </div>
            </Link>
          </section>

          <section className="side-card">
            <p className="section-kicker">What Changed</p>
            <h3>Catalog cleanup</h3>
            <p>The site now keeps only the four arcade games you actually wanted visible.</p>
          </section>
        </aside>
      </section>
    </main>
  );
}
