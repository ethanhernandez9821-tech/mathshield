import ImportedGamePage from "@/components/ImportedGamePage";

export default function ArenaPvpPage() {
  return (
    <ImportedGamePage
      badge="Imported Arena Shooter"
      title="Arena PvP"
      description="A real imported arena shooter with a pseudo-3D look, gun-heavy combat, bot opponents, and mouse-led aim."
      src="/games/arena-pvp/index.html"
      license="MIT licensed client"
      slug="arena-pvp"
      howToPlay="Use WASD to move, move the mouse to steer your aim, left click to fire, and use the menus to start local bot-heavy modes. This one is the closest match to the arcade gunfight feel you asked for."
      tags={["Crosshair aim", "Bot combat", "Arena shooter"]}
      sourceNote="Source: KesieV's Player Versus Player client files, self-hosted here from the static MIT-licensed game client."
      crosshair
    />
  );
}
