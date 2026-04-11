import ImportedGamePage from "@/components/ImportedGamePage";

export default function DriftBossPage() {
  return (
    <ImportedGamePage
      badge="Featured Imported Game"
      title="Drift Boss"
      description="A one-button drifter with fast restarts, sharp corners, and a self-hosted HTML5 build."
      src="/games/drift-boss/index.html"
      license="Imported build"
      slug="drift-boss"
      howToPlay="Tap or click to turn. Let go to straighten out. The whole challenge is controlling momentum without falling off the path."
      tags={["One-button", "Fast restarts", "Timing"]}
      sourceNote="Source files were provided for self-hosting inside MathShield and are embedded here as a live arcade import."
    />
  );
}
