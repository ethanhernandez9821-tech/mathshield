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
          <span className="brand-sub">Arcade + Math Lab</span>
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
            <h1 className="dashboard-title">Open the action lineup fast.</h1>
            <p className="dashboard-copy">
              Arcade Lab now leans into better imported HTML5 games: cleaner shooters, parkour-combat, one-button
              drifting, and a real futuristic racer. Math Lab stays smaller and cleaner.
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
              <h2>Imported arcade games</h2>
              <p>Jump into survival shooters, arena fights, platform combat, drifting, and a polished 3D racer.</p>
            </Link>

            <Link href="/games" className="quick-link quick-link--math">
              <p className="section-kicker">Math Lab</p>
              <h2>Imported math games</h2>
              <p>Math Lab stays clean and only lists real imported puzzle games like 2048.</p>
            </Link>
          </div>

          <div className="info-strip">
            <article className="info-card">
              <p className="section-kicker">Today</p>
              <h3>{featuredGame.title}</h3>
              <p>The featured arcade pick rotates once per day across the live imported lineup.</p>
            </article>

            <article className="info-card">
              <p className="section-kicker">Shooter Mix</p>
              <h3>Combat + movement</h3>
              <p>The action side now mixes mouse-aim combat with platform movement and cleaner imported arcade pacing.</p>
            </article>

            <article className="info-card">
              <p className="section-kicker">Racing + Range</p>
              <h3>More range, less filler</h3>
              <p>Arcade Lab now mixes shooters with Drift Boss and HexGL so the lineup feels more like a real game hub.</p>
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
            <h3>Arcade got curated</h3>
            <p>
              The arcade is shifting toward stronger imported HTML5 games with menus, instructions, and real variety
              instead of the weaker random imports.
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}
