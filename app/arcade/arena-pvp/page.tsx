import ImportedGamePage from "@/components/ImportedGamePage";

export default function ArenaPvpPage() {
  return (
    <ImportedGamePage
      badge="Arena shooter"
      title="Arena PvP"
      description="Arena shooter with bots and mouse aim."
      src="/games/arena-pvp/index.html"
      license="MIT licensed client"
      slug="arena-pvp"
      howToPlay="Use WASD to move, the mouse to aim, and left click to fire. Use the menu to start a local bot match."
      tags={["Crosshair aim", "Bot combat", "Arena shooter"]}
      sourceNote="KesieV's Player Versus Player client, self-hosted here from its MIT game files."
      crosshair
    />
  );
}
