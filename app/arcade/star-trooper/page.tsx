import ImportedGamePage from "@/components/ImportedGamePage";

export default function StarTrooperPage() {
  return (
    <ImportedGamePage
      badge="Imported Combat Game"
      title="Star Trooper"
      description="A real imported shooter with enemy waves, lasers, and a cleaner combat loop than the retro classics."
      src="/games/star-trooper/index.html"
      license="MIT licensed"
      slug="star-trooper"
      howToPlay="Use W, A, S, and D to move your ship and hit space to fire. Survive incoming waves and push for a higher score."
      tags={["Shooter", "Enemy waves", "Arcade combat"]}
      sourceNote="Source: Isaac Gonzalez's Star Trooper project, self-hosted here under the MIT license."
    />
  );
}
