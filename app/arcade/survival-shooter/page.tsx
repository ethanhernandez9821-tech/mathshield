import ImportedGamePage from "@/components/ImportedGamePage";

export default function SurvivalShooterPage() {
  return (
    <ImportedGamePage
      badge="Imported Survival Shooter"
      title="Survival Shooter"
      description="A modern imported top-down shooter with mouse aim, reload timing, perk builds, and enemy shooters firing back."
      src="/games/survival-shooter/game.html"
      license="MIT licensed"
      slug="survival-shooter"
      howToPlay="Use WASD to move, aim and attack with the mouse, switch weapons with 1 through 4, trigger skills with Q, E, and F, and reload with R. Enemy shooters push back, so this one feels way closer to the action-heavy arcade vibe you wanted."
      tags={["Crosshair aim", "Enemy gunners", "Perk builds"]}
      sourceNote="Source: Marcel Carl's Top-Down Survival Shooter, built from its MIT-licensed source and self-hosted here."
      crosshair
    />
  );
}
