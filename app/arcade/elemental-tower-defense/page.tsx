import ImportedGamePage from "@/components/ImportedGamePage";

export default function ElementalTowerDefensePage() {
  return (
    <ImportedGamePage
      badge="Imported Tower Defense"
      title="Elemental Tower Defense"
      description="A real imported tower defense game with elemental towers, upgrades, and enemy waves across multiple difficulties."
      src="/games/elemental-td/index.html"
      license="MIT licensed"
      slug="elemental-tower-defense"
      howToPlay="Use the arrow keys to move your cursor, Q/W/E/R to place elemental towers, T for upgrades, and P to start the next wave."
      tags={["Tower defense", "Waves", "Upgrades"]}
      sourceNote="Source: Frandy Jay-R Usi's Elemental Tower Defense project, self-hosted here under the MIT license."
    />
  );
}
