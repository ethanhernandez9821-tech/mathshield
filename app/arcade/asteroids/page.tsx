import ImportedGamePage from "@/components/ImportedGamePage";

export default function AsteroidsPage() {
  return (
    <ImportedGamePage
      badge="Imported Open-Source Game"
      title="Asteroids"
      description="A real imported HTML5 shooter with inertia, thrust, rotation, and laser timing."
      src="/games/asteroids/index.html"
      license="MIT licensed"
      slug="asteroids"
      howToPlay="Use the controls on screen or your keyboard to rotate, thrust, and fire. The ship carries momentum, so smooth movement matters."
      tags={["Space shooter", "Momentum", "Arcade classic"]}
      sourceNote="Source: Doug McInnes' HTML5 Asteroids project, self-hosted here under the MIT license."
    />
  );
}
