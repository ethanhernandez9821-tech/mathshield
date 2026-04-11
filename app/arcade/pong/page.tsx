import ImportedGamePage from "@/components/ImportedGamePage";

export default function PongPage() {
  return (
    <ImportedGamePage
      badge="Imported Open-Source Game"
      title="Pong"
      description="A real imported Pong build with solo play, versus mode, and clean arcade motion."
      src="/games/pong/index.html"
      license="MIT licensed"
      slug="pong"
      howToPlay="Press 1 for solo, 2 for versus, or 0 for computer versus computer. Player one uses Q and A, and player two uses P and L."
      tags={["Two-player", "Arcade classic", "Fast rallies"]}
      sourceNote="Source: Jake Gordon's open-source Pong project, self-hosted here under the MIT license."
    />
  );
}
