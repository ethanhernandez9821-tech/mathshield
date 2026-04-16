import ImportedGamePage from "@/components/ImportedGamePage";

export default function StarTrooperPage() {
  return (
    <ImportedGamePage
      badge="Imported Phaser Shooter"
      title="Star Trooper"
      description="A staged space shooter with three combat phases, simple controls, and a straightforward score-chasing arcade loop."
      src="/games/star-trooper/index.html"
      license="MIT licensed"
      slug="star-trooper"
      howToPlay="Use W, A, S, and D to steer your ship, hit Space to fire, and survive the stage set while pushing for a better score."
      tags={["Three stages", "Keyboard shooter", "Score chase"]}
      sourceNote="Source: Isaac Gonzalez's Star Trooper project, self-hosted here from its MIT-licensed browser build."
      openHref="/games/star-trooper/index.html"
      restartLabel="Restart run"
    />
  );
}
