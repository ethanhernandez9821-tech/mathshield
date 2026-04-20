import ImportedGamePage from "@/components/ImportedGamePage";

export default function VibeFpsPage() {
  return (
    <ImportedGamePage
      badge="3D shooter"
      title="VibeFPS"
      description="3D target shooter with settings and quick rounds."
      src="/games/vibe-fps/index.html"
      license="Open source build"
      slug="vibe-fps"
      howToPlay="Press play to load it, click into the game to lock the mouse, use WASD to move, left click to shoot, R to reload, and Space to jump."
      tags={["3D shooter", "Settings", "Quick rounds"]}
      sourceNote="VibeFPS, self-hosted here from its public browser source."
      openHref="/games/vibe-fps/index.html"
      restartLabel="Reload"
      deferLoad
      previewImage="/thumbnails/vibe-fps.png"
      loadLabel="Load shooter"
      crosshair
    />
  );
}
