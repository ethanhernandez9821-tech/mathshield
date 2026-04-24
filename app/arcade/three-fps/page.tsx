import ImportedGamePage from "@/components/ImportedGamePage";

export default function ThreeFpsPage() {
  return (
    <ImportedGamePage
      badge="3D FPS"
      title="Three FPS"
      description="Wave FPS with map votes, loadouts, and upgrades."
      src="/games/three-fps/index.html"
      license="MIT licensed"
      slug="three-fps"
      howToPlay="Press play to load it, then click into the game to lock the mouse. Use WASD to move, left click to shoot, Shift to sprint, C to slide, Space to jump, R to reload, and 1 to 8 to swap unlocked guns."
      tags={["3D FPS", "Wave system", "Crosshair aim"]}
      sourceNote="Mohsen Heydari's three-fps demo, rebuilt here from its MIT browser source."
      openHref="/games/three-fps/index.html"
      restartLabel="Back to menu"
      deferLoad
      previewImage="/thumbs/three-fps"
      loadLabel="Load FPS"
      crosshair
      mobileControls={["Move joystick", "Look pad", "Shoot", "Jump", "Slide", "Sprint", "Reload"]}
    />
  );
}
