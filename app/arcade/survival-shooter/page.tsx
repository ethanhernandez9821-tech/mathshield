import ImportedGamePage from "@/components/ImportedGamePage";

export default function SurvivalShooterPage() {
  return (
    <ImportedGamePage
      badge="Imported Survival Shooter"
      title="Survival Shooter"
      description="A modern imported top-down shooter with a real menu, perk library, enemy showcase, and enemy shooters firing back."
      src="/games/survival-shooter/index.html"
      license="MIT licensed"
      slug="survival-shooter"
      howToPlay="Start from the launcher menu, check the perk and enemy screens if you want the full rundown, then use WASD to move, aim with the mouse, fire with left click, reload with R, swap weapons with 1 through 4, and trigger skills with Q, E, and F."
      tags={["Launcher menu", "Crosshair aim", "Perk library"]}
      sourceNote="Source: Marcel Carl's Top-Down Survival Shooter, built from its MIT-licensed source and self-hosted here with its launcher and help screens intact."
      openHref="/games/survival-shooter/index.html"
      restartLabel="Back to menu"
    />
  );
}
