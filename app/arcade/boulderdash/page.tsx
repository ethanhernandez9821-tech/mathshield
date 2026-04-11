import ImportedGamePage from "@/components/ImportedGamePage";

export default function BoulderDashPage() {
  return (
    <ImportedGamePage
      badge="Imported Open-Source Game"
      title="Boulder Dash"
      description="A real imported Boulder Dash build with maze digging, falling boulders, diamonds, and route-planning."
      src="/games/boulderdash/index.html"
      license="MIT licensed"
      slug="boulderdash"
      howToPlay="Use the arrow keys to move Rockford, collect diamonds, and watch the rocks above you because gravity is part of the puzzle."
      tags={["Maze digging", "Route planning", "Classic puzzle"]}
      sourceNote="Source: Jake Gordon's open-source Javascript BoulderDash project, self-hosted here under the MIT license."
    />
  );
}
