import ImportedGamePage from "@/components/ImportedGamePage";

export default function TuxRacerPage() {
  return (
    <ImportedGamePage
      badge="Racing"
      title="Tux Racer"
      description="Downhill snow racer with long tracks and fast turns."
      src="/games/tux-racer/index.html"
      license="GPL-2.0"
      slug="tux-racer"
      howToPlay="Press play to load it, pick a course, then use the in-game controls to carve downhill, collect speed, and stay on the line."
      tags={["Downhill racer", "Course select", "Long runs"]}
      sourceNote="Tux Racer Web, self-hosted here from its GPL browser source."
      openHref="/games/tux-racer/index.html"
      restartLabel="Reload"
      deferLoad
      previewImage="/thumbnails/tux-racer.webp"
      loadLabel="Load racer"
    />
  );
}
