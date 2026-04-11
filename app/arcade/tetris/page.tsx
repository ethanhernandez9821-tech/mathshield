import ImportedGamePage from "@/components/ImportedGamePage";

export default function TetrisPage() {
  return (
    <ImportedGamePage
      badge="Imported Open-Source Game"
      title="Tetris"
      description="A real imported Tetris build with falling blocks, row clears, and score chasing."
      src="/games/tetris/index.html"
      license="MIT licensed"
      slug="tetris"
      howToPlay="Press space to start, move with the arrow keys, rotate with up, and stack clean rows before the board fills up."
      tags={["Falling blocks", "Score chase", "Arcade classic"]}
      sourceNote="Source: Jake Gordon's open-source Javascript Tetris project, self-hosted here under the MIT license."
    />
  );
}
