import ImportedGamePage from "@/components/ImportedGamePage";

export default function ShooterGame3DPage() {
  return (
    <ImportedGamePage
      badge="Imported FPS Arena"
      title="Shooter Game 3D"
      description="A real imported Three.js FPS with a start screen, how-to-play overlay, pointer-lock controls, sprinting, jumping, and clean crosshair shooting."
      src="/games/shooter-game-3d/index.html"
      license="MIT licensed"
      slug="shooter-game-3d"
      howToPlay="Open the built-in How to Play panel if you need it, start the match, click into the scene to lock the mouse, move with WASD or arrows, sprint with Shift, jump with Space, and shoot with left click."
      tags={["3D FPS", "Start menu", "Pointer lock"]}
      sourceNote="Source: Vance's ShooterGame project, self-hosted here from its MIT-licensed browser source with local copies of its Three.js dependencies."
      openHref="/games/shooter-game-3d/index.html"
      restartLabel="Restart arena"
      crosshair
    />
  );
}
