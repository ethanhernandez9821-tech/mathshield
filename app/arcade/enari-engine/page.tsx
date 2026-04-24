import ImportedGamePage from "@/components/ImportedGamePage";

export default function EnariEnginePage() {
  return (
    <ImportedGamePage
      badge="Imported Three.js FPS"
      title="Enari Engine"
      description="A real imported FPS engine with weapon models, physics, and a full 3D arena."
      src="/games/enari-engine/index.html"
      license="MIT source"
      slug="enari-engine"
      howToPlay="Load the build, click into the game, then use WASD to move and the mouse to aim. Use left click to shoot, R to reload, number keys to swap weapons, and Escape to release the mouse."
      tags={["Three.js", "Weapon models", "Pointer lock"]}
      sourceNote="iErcann's Enari Engine, built from its MIT-licensed browser source and self-hosted here."
      openHref="/games/enari-engine/index.html"
      restartLabel="Reload engine"
      deferLoad
      previewImage="/thumbnails/enari-engine.webp"
      loadLabel="Load Enari"
      crosshair
      mobileSupportNote="This imported build is desktop-first and does not ship with working touch controls yet."
    />
  );
}
