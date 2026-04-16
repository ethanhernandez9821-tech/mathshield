import ImportedGamePage from "@/components/ImportedGamePage";

export default function ThreeFpsPage() {
  return (
    <ImportedGamePage
      badge="Imported 3D FPS"
      title="Three FPS"
      description="A real 3D FPS import with NPC enemies, ammo boxes, pointer-lock aiming, sprinting, jumping, and a proper menu before the fight starts."
      src="/games/three-fps/index.html"
      license="MIT licensed"
      slug="three-fps"
      howToPlay="Hit New Game from the built-in menu, click into the game to lock the mouse, move with WASD, aim with the mouse, fire with left click, sprint with Shift, and jump with Space."
      tags={["3D FPS", "NPC enemies", "Crosshair aim"]}
      sourceNote="Source: Mohsen Heydari's three-fps demo, self-hosted here from its MIT-licensed browser build with credited third-party art assets."
      openHref="/games/three-fps/index.html"
      restartLabel="Back to menu"
      crosshair
    />
  );
}
