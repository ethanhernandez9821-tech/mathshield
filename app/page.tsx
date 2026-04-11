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
            <h1 className="dashboard-title">Open a section fast.</h1>
            <p className="dashboard-copy">
              Sign in to earn XP, track your time, and jump between original arcade builds and math-lab mini games.
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
              <h2>Playable lineup</h2>
              <p>Open the arcade page, search the lineup, and launch the daily featured game or any original build.</p>
            </Link>

            <Link href="/games" className="quick-link quick-link--math">
              <p className="section-kicker">Math Lab</p>
              <h2>Math mini games</h2>
              <p>Train memory, logic, spelling, and arithmetic in short rounds built directly into the site.</p>
            </Link>
          </div>

          <div className="info-strip">
            <article className="info-card">
              <p className="section-kicker">Today</p>
              <h3>{featuredGame.title}</h3>
              <p>The featured arcade pick updates once per day across the playable arcade lineup.</p>
            </article>

            <article className="info-card">
              <p className="section-kicker">XP System</p>
              <h3>Sign in to earn</h3>
              <p>XP only counts while you are logged in, and your challenge progress saves to your profile.</p>
            </article>

            <article className="info-card">
              <p className="section-kicker">Profile</p>
              <h3>Levels + default pfp</h3>
              <p>Your profile now shows a default avatar, level, XP total, and saved Drift Boss time.</p>
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
            <h3>XP is now part of the site</h3>
            <p>
              Login and sign up are no longer just placeholders. You can create an account, sign in, and start
              saving progress.
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}
