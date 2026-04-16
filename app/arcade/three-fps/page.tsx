import ImportedGamePage from "@/components/ImportedGamePage";

export default function ThreeFpsPage() {
  return (
    <ImportedGamePage
      badge="Imported 3D FPS"
      title="Three FPS"
      description="A real 3D FPS import that now runs one-minute waves with map voting, loadout switching, tracers, enemy health bars, sliding, and upgrade picks between rounds."
      src="/games/three-fps/index.html"
      license="MIT licensed"
      slug="three-fps"
      howToPlay="Start the run from the built-in menu, vote on a map, click into the game to lock the mouse, move with WASD, fire with left click, sprint with Shift, slide with C, jump with Space, reload with R, and swap unlocked guns with 1, 2, and 3 between waves."
      tags={["3D FPS", "Wave system", "Crosshair aim"]}
      sourceNote="Source: Mohsen Heydari's three-fps demo, rebuilt here from its MIT-licensed browser source and customized inside MathShield with new waves, UI, map voting, and combat feel changes."
      openHref="/games/three-fps/index.html"
      restartLabel="Back to menu"
      crosshair
    />
  );
}
