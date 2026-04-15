import ImportedGamePage from "@/components/ImportedGamePage";

export default function NGonPage() {
  return (
    <ImportedGamePage
      badge="Imported Platform Combat"
      title="n-gon"
      description="A physics-heavy platform combat import with built-in settings, controls, training, and a much stronger movement-and-fighting vibe."
      src="/games/n-gon/index.html"
      license="GPL licensed"
      slug="n-gon"
      howToPlay="Use the start, training, or experiment buttons from the built-in splash screen, then move with A and D, jump with W, crouch with S, fire with F or left click, use your field with Space or right click, and pause with P."
      tags={["Platform combat", "Training mode", "Built-in settings"]}
      sourceNote="Source: Ross Landgreen's n-gon project, self-hosted here from its GPL-licensed browser source."
      openHref="/games/n-gon/index.html"
      restartLabel="Restart splash"
    />
  );
}
