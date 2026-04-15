import ImportedGamePage from "@/components/ImportedGamePage";

export default function HexglPage() {
  return (
    <ImportedGamePage
      badge="Imported Futuristic Racer"
      title="HexGL"
      description="A polished HTML5 futuristic racer with its own menu, settings, credits, and a much sharper arcade feel than the weaker filler imports."
      src="/games/hexgl/index.html"
      license="MIT licensed"
      slug="hexgl"
      howToPlay="Launch from the built-in menu, use the keyboard controls shown in the game setup, and race through the neon track while managing speed, corners, and clean lines."
      tags={["3D racer", "Built-in menu", "Settings screen"]}
      sourceNote="Source: BKcore's HexGL project, self-hosted here from its MIT-licensed HTML5/WebGL source."
      openHref="/games/hexgl/index.html"
      restartLabel="Restart menu"
    />
  );
}
