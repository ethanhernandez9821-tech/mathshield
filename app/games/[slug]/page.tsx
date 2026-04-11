import { notFound } from "next/navigation";
import PlayableGameLab from "@/components/PlayableGameLab";
import TopBar from "@/components/TopBar";
import { getGameBySlug } from "@/data/games";
import { getPlayableGameConfig } from "@/lib/playable-games";

export default async function MathGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  const config = getPlayableGameConfig(slug);

  if (!game || game.category !== "math") {
    notFound();
  }

  if (!config) {
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

      <PlayableGameLab game={game} config={config} />
    </main>
  );
}
