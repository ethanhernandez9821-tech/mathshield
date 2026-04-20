import ImportedGamePage from "@/components/ImportedGamePage";

export default function HexglPage() {
  return (
    <ImportedGamePage
      badge="Racing"
      title="HexGL"
      description="3D hover racer with menus and time trials."
      src="/games/hexgl/index.html"
      license="MIT licensed"
      slug="hexgl"
      howToPlay="Load the game, use the built-in menu, then follow the in-game controls and stay clean through the corners."
      tags={["3D racer", "Built-in menu", "Settings screen"]}
      sourceNote="BKcore's HexGL project, self-hosted here from its MIT HTML5/WebGL source."
      openHref="/games/hexgl/index.html"
      restartLabel="Restart menu"
      deferLoad
      previewImage="/thumbnails/hexgl.png"
      loadLabel="Load racer"
    />
  );
}
