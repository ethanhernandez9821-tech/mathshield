import GameProgressCard from "@/components/GameProgressCard";
import TopBar from "@/components/TopBar";

type ImportedGamePageProps = {
  badge: string;
  title: string;
  description: string;
  src: string;
  license: string;
  slug: string;
  howToPlay: string;
  tags: string[];
  sourceNote: string;
};

export default function ImportedGamePage({
  badge,
  title,
  description,
  src,
  license,
  slug,
  howToPlay,
  tags,
  sourceNote,
}: ImportedGamePageProps) {
  return (
    <main className="page-shell">
      <TopBar />

      <section className="page-hero">
        <div>
          <p className="section-kicker">{badge}</p>
          <h1 className="arcade-title">{title}</h1>
          <p className="arcade-copy">{description}</p>
        </div>
      </section>

      <section className="game-layout">
        <div className="game-frame">
          <div className="game-frame-top">
            <span className="poster-chip">{license}</span>
            <span className="frame-status">Imported and playable</span>
          </div>
          <iframe src={src} title={title} className="game-embed" allowFullScreen />
        </div>

        <aside className="note-card">
          <p className="section-kicker">Quick Notes</p>
          <h2>How it plays</h2>
          <p>{howToPlay}</p>
          <div className="tag-row">
            {tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <GameProgressCard slug={slug} />
          <p className="challenge-copy">{sourceNote}</p>
        </aside>
      </section>
    </main>
  );
}
