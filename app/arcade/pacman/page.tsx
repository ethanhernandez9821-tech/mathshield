import ImportedGamePage from "@/components/ImportedGamePage";

export default function PacmanPage() {
  return (
    <ImportedGamePage
      badge="Imported Open-Source Game"
      title="Pac-Man Canvas"
      description="A real imported Pac-Man build running from self-hosted HTML5 canvas code inside MathShield."
      src="/games/pacman/index.html"
      license="CC0 source"
      slug="pacman"
      howToPlay="Use the arrow keys or WASD to move Pac-Man through the maze, eat pellets, avoid ghosts, and grab power pellets when you need breathing room."
      tags={["Maze chase", "Ghost AI", "Arcade classic"]}
      sourceNote="Source: platzhersh's Pac-Man Canvas project, self-hosted here from its CC0-licensed source files."
    />
  );
}
