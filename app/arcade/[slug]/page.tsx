import Image from "next/image";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import { getGameBySlug } from "@/data/games";

export default async function ArcadeGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game || game.category !== "arcade" || game.slug === "drift-boss") {
    notFound();
  }

  return (
    <main className="page-shell">
      <TopBar />

      <section className="page-hero page-hero--compact">
        <div>
          <p className="section-kicker">Arcade Catalog</p>
          <h1 className="arcade-title">{game.title}</h1>
          <p className="arcade-copy">{game.description}</p>
        </div>
      </section>

      <section className="coming-layout">
        <div className="coming-poster">
          <Image src={game.thumbnail} alt={game.title} fill className="object-cover" unoptimized />
        </div>

        <aside className="coming-card">
          <p className="section-kicker">Status</p>
          <h2>{game.status === "live" ? "Playable now" : "Coming soon"}</h2>
          <p>
            This arcade title has a real card and artwork, but it is staying in the catalog until it has actual
            imported or properly built game code behind it.
          </p>
          <div className="tag-row">
            <span className="tag">Catalog ready</span>
            <span className="tag">Image ready</span>
            <span className="tag">Waiting on real game code</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
