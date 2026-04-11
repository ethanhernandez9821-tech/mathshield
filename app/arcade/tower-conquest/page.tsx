import ImportedGamePage from "@/components/ImportedGamePage";

export default function TowerConquestPage() {
  return (
    <ImportedGamePage
      badge="Imported Tower Strategy"
      title="Tower Conquest"
      description="A real imported tower-control strategy game where you link towers, send units, and beat an AI opponent."
      src="/games/tower-conquest/index.html"
      license="MIT licensed"
      slug="tower-conquest"
      howToPlay="Click one of your towers, then click another tower to send units. Attack enemy and neutral towers, support your own, and take over the whole map."
      tags={["Tower control", "AI battles", "Strategy"]}
      sourceNote="Source: Diganta Dey's Tower Conquest project, self-hosted here under the MIT license."
    />
  );
}
