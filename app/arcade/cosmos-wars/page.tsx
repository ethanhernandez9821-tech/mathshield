import ImportedGamePage from "@/components/ImportedGamePage";

export default function CosmosWarsPage() {
  return (
    <ImportedGamePage
      badge="Imported Space Shooter"
      title="Cosmos Wars"
      description="A real Phaser space shooter with pointer-led aiming, pilot-name entry, chasing enemy ships, and arcade-style score pressure."
      src="/games/cosmos-wars/index.html"
      license="MIT licensed"
      slug="cosmos-wars"
      howToPlay="Start from the built-in name screen, move toward the points you pick, rotate your ship with the mouse, and fire while dodging enemy ships and rock hazards."
      tags={["Mouse aim", "Ship combat", "Name entry"]}
      sourceNote="Source: Ramin Mammadzada's Cosmos Wars project, self-hosted here from its MIT-licensed Phaser browser build."
      openHref="/games/cosmos-wars/index.html"
      restartLabel="Restart run"
      crosshair
    />
  );
}
