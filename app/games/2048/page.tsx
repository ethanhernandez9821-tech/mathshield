import ImportedGamePage from "@/components/ImportedGamePage";

export default function Game2048Page() {
  return (
    <ImportedGamePage
      badge="Imported Open-Source Game"
      title="2048"
      description="A real imported browser game, self-hosted inside MathShield. This one uses the original open-source web codebase instead of a homemade placeholder."
      src="/games/2048/index.html"
      license="MIT licensed"
      slug="2048"
      howToPlay="Use the arrow keys to slide the tiles. Matching numbers merge, and your goal is to reach the 2048 tile."
      tags={["Arrow keys", "Puzzle", "Imported source"]}
      sourceNote="Source: Gabriele Cirulli's open-source 2048 project, self-hosted here under the MIT license."
    />
  );
}
