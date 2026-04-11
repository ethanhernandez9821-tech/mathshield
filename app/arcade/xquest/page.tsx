import ImportedGamePage from "@/components/ImportedGamePage";

export default function XQuestPage() {
  return (
    <ImportedGamePage
      badge="Imported Combat Game"
      title="XQuest JS"
      description="A real imported HTML5 shooter with mouse shooting, powerups, bombs, and enemy swarms."
      src="/games/xquest/index.html"
      license="MIT licensed"
      slug="xquest"
      howToPlay="Move with the mouse to accelerate, left click to shoot, and right click to drop a bomb. The game rewards sharper movement and fast reaction under pressure."
      tags={["Mouse shooting", "Enemy swarms", "Powerups"]}
      sourceNote="Source: Scott Rippey's XQuest JS project, self-hosted here under the MIT license."
    />
  );
}
