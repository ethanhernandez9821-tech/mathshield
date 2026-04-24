import ImportedGamePage from "@/components/ImportedGamePage";

export default function NemesisPage() {
  return (
    <ImportedGamePage
      badge="Imported WebGL FPS"
      title="Nemesis"
      description="A classic browser FPS with enemies, pickups, score, radar, and mouse aiming."
      src="/games/nemesis/index.html"
      license="GPLv3 source"
      slug="nemesis"
      howToPlay="Load the game, click the intro screen, use WASD to move, move the mouse to look, and click to shoot. Grab pickups to stay alive."
      tags={["WebGL", "Enemies", "Radar"]}
      sourceNote="Isaac Sukin's Nemesis project, self-hosted here from its GPLv3 browser source."
      openHref="/games/nemesis/index.html"
      restartLabel="Reload match"
      deferLoad
      previewImage="/thumbnails/nemesis.jpg"
      loadLabel="Load Nemesis"
      crosshair
      mobileSupportNote="Nemesis is an older desktop-first WebGL FPS and does not include on-screen touch controls."
    />
  );
}
