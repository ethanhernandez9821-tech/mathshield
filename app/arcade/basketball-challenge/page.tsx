import ImportedGamePage from "@/components/ImportedGamePage";

export default function BasketballChallengePage() {
  return (
    <ImportedGamePage
      badge="Imported Arcade Basketball"
      title="Basketball Challenge"
      description="A real imported canvas basketball game with angle control, shot power timing, streak animations, and a simple play menu."
      src="/games/basketball-challenge/index.html"
      license="MIT licensed"
      slug="basketball-challenge"
      howToPlay="Start from the splash screen, hold Space to build shot power, release to launch, and use the moving angle guide to line up cleaner arcs."
      tags={["Shot timing", "Power meter feel", "Canvas sports"]}
      sourceNote="Source: James Lim's Canvas Basketball Game, self-hosted here from its MIT-licensed browser source."
      openHref="/games/basketball-challenge/game.html"
      restartLabel="Restart court"
    />
  );
}
