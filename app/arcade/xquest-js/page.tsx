import ImportedGamePage from "@/components/ImportedGamePage";

export default function XQuestJsPage() {
  return (
    <ImportedGamePage
      badge="Imported Momentum Shooter"
      title="XQuest JS"
      description="A fast HTML5 shooter with momentum-based movement, power stars, bombs, and a sharper survival rhythm than most tiny browser shooters."
      src="/games/xquest-js/index.html"
      license="MIT licensed"
      slug="xquest-js"
      howToPlay="Accelerate with the mouse, arrow keys, or touch, shoot enemies, grab stars to open the gate, and use bombs when the room gets crowded."
      tags={["Momentum movement", "Bombs", "Power stars"]}
      sourceNote="Source: Scot Trippey's XQuest JS project, self-hosted here from its MIT-licensed browser source."
      openHref="/games/xquest-js/index.html"
      restartLabel="Restart round"
      crosshair
    />
  );
}
