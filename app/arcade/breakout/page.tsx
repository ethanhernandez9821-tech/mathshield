import ImportedGamePage from "@/components/ImportedGamePage";

export default function BreakoutPage() {
  return (
    <ImportedGamePage
      badge="Imported Open-Source Game"
      title="Breakout"
      description="A real imported Breakout build with brick patterns, level swapping, and old-school paddle control."
      src="/games/breakout/index.html"
      license="MIT licensed"
      slug="breakout"
      howToPlay="Press space to start, move the paddle with the arrow keys, and keep the ball in play while you clear every brick."
      tags={["Brick breaker", "Paddle", "Level-based"]}
      sourceNote="Source: Jake Gordon's open-source Breakout project, self-hosted here under the MIT license with included sound attribution."
    />
  );
}
