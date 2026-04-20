import ImportedGamePage from "@/components/ImportedGamePage";

export default function SurvivalShooterPage() {
  return (
    <ImportedGamePage
      badge="Survival shooter"
      title="Survival Shooter"
      description="Top-down shooter with menus, perks, and enemy fire."
      src="/games/survival-shooter/index.html"
      license="MIT licensed"
      slug="survival-shooter"
      howToPlay="Use the launcher menu, then move with WASD, aim with the mouse, shoot with left click, reload with R, swap weapons with 1 to 4, and use skills with Q, E, and F."
      tags={["Launcher menu", "Crosshair aim", "Perk library"]}
      sourceNote="Marcel Carl's Top-Down Survival Shooter, self-hosted here from its MIT source."
      openHref="/games/survival-shooter/index.html"
      restartLabel="Back to menu"
    />
  );
}
