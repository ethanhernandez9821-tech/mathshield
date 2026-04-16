import ImportedGamePage from "@/components/ImportedGamePage";

export default function MicroShootersPage() {
  return (
    <ImportedGamePage
      badge="Imported Arcade Shooter"
      title="Micro Shooters"
      description="A fuller arcade shooter with waves, boss fights, laser upgrades, score climbing, and a built-in nickname screen."
      src="/games/micro-shooters/index.html"
      license="ISC licensed"
      slug="micro-shooters"
      howToPlay="Enter a nickname on the built-in splash screen, then use arrow keys to move and Space to fire. Survive the wave ladder, stack upgrades, and chase the boss and infinite mode."
      tags={["Boss fight", "Wave ladder", "Upgrade drops"]}
      sourceNote="Source: Cristian Ceamatu's Micro Shooters project, self-hosted here from its ISC-licensed Phaser browser build."
      openHref="/games/micro-shooters/index.html"
      restartLabel="Restart run"
    />
  );
}
