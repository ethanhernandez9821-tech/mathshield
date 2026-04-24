import ImportedGamePage from "@/components/ImportedGamePage";

export default function ShooterGamePage() {
  return (
    <ImportedGamePage
      badge="Imported Three.js FPS"
      title="Shooter Game"
      description="A real Three.js pointer-lock shooter import with sprinting, jumping, weapon audio, and impact particles."
      src="/games/shooter-game/index.html"
      license="MIT licensed source"
      slug="shooter-game"
      howToPlay="Press start, click into the game to lock the mouse, use WASD to move, Shift to sprint, Space to jump, and left click to fire."
      tags={["Three.js", "Pointer lock", "Particle hits"]}
      sourceNote="Vance's ShooterGame project, self-hosted here from its MIT-licensed browser source."
      openHref="/games/shooter-game/index.html"
      restartLabel="Back to splash"
      deferLoad
      previewImage="/thumbnails/shooter-game.png"
      loadLabel="Load shooter"
      crosshair
      mobileSupportNote="This import is desktop-first. It does not have a proper on-screen joystick or look pad yet."
    />
  );
}
