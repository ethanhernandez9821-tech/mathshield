import Image from "next/image";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import { getGameBySlug } from "@/data/games";

export default async function MathGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game || game.category !== "math") {
    notFound();
  }

  return (
    <main className="page-shell">
      <TopBar />

      <section className="page-hero page-hero--compact">
        <div>
          <p className="section-kicker">Math Lab Catalog</p>
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
            This title is in the MathShield catalog, but only imported or fully built games get the real playable
            treatment. More open-source imports are next.
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
