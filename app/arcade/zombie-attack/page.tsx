import ImportedGamePage from "@/components/ImportedGamePage";

export default function ZombieAttackPage() {
  return (
    <ImportedGamePage
      badge="Imported Zombie Shooter"
      title="Zombie Attack"
      description="A real imported zombie shooter with rising pressure, score-chasing, and a cleaner horde-defense loop."
      src="/games/zombie-attack/index.html"
      license="MIT licensed"
      slug="zombie-attack"
      howToPlay="Use the arrow keys to move and press Space to fire. Zombies rush down the field in waves, and your goal is to stay alive, keep your lives up, and push your score higher."
      tags={["Zombies", "Score chase", "Horde pressure"]}
      sourceNote="Source: Felipe Rosa's Zombie Attack project, built from its MIT-licensed source and self-hosted here."
    />
  );
}
