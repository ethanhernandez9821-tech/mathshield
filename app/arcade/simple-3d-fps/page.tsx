import ImportedGamePage from "@/components/ImportedGamePage";

export default function Simple3dFpsPage() {
  return (
    <ImportedGamePage
      badge="Imported BabylonJS FPS"
      title="Simple 3D FPS"
      description="A real BabylonJS browser shooter with a full weapon model, enemy targets, music, and a proper 3D arena."
      src="/games/simple-3d-fps/index.html"
      license="MIT licensed source"
      slug="simple-3d-fps"
      howToPlay="Press load, click into the arena to lock the mouse, use WASD to move, left click to fire, and R to reload. This import is heavier than the site-built shooters, so give it a second to boot."
      tags={["BabylonJS", "3D arena", "Enemy waves"]}
      sourceNote="Tiago Silva Pereira's Simple 3D FPS, self-hosted here from its MIT-licensed browser build."
      openHref="/games/simple-3d-fps/index.html"
      restartLabel="Reload arena"
      deferLoad
      previewImage="/thumbnails/simple-3d-fps.jpg"
      loadLabel="Load Babylon FPS"
      crosshair
      mobileSupportNote="This imported BabylonJS build is desktop-first. On phones or tablets, use the site-built shooters for touch controls."
    />
  );
}
