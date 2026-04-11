import { getGameBySlug, type GameTheme } from "@/data/games";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function splitTitle(title: string) {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 16 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines.slice(0, 3);
}

function getTheme(theme: GameTheme) {
  switch (theme) {
    case "orange":
      return { top: "#ff9f43", bottom: "#7a3a12", accent: "#ffd89a" };
    case "lime":
      return { top: "#c1ff72", bottom: "#255b22", accent: "#efffd0" };
    case "violet":
      return { top: "#b798ff", bottom: "#2f235f", accent: "#e7dcff" };
    case "rose":
      return { top: "#ff8ab5", bottom: "#612243", accent: "#ffe0eb" };
    case "gold":
      return { top: "#ffd166", bottom: "#6a4812", accent: "#fff0c8" };
    default:
      return { top: "#78dcff", bottom: "#16384f", accent: "#dff7ff" };
  }
}

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const game = getGameBySlug(slug);

  if (!game) {
    return new Response("Not found", { status: 404 });
  }

  const theme = getTheme(game.theme);
  const lines = splitTitle(game.title);
  const lineMarkup = lines
    .map(
      (line, index) =>
        `<text x="44" y="${150 + index * 54}" font-size="42" font-family="Arial, sans-serif" font-weight="700" fill="${theme.accent}">${escapeXml(
          line
        )}</text>`
    )
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-label="${escapeXml(game.title)}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${theme.top}" />
          <stop offset="100%" stop-color="${theme.bottom}" />
        </linearGradient>
        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="1200" height="675" rx="38" fill="url(#bg)"/>
      <rect width="1200" height="675" rx="38" fill="url(#grid)"/>
      <circle cx="1010" cy="140" r="130" fill="rgba(255,255,255,0.08)"/>
      <circle cx="1100" cy="520" r="180" fill="rgba(0,0,0,0.14)"/>
      <rect x="44" y="44" width="220" height="44" rx="22" fill="rgba(10,12,16,0.28)" stroke="rgba(255,255,255,0.2)"/>
      <text x="72" y="73" font-size="24" font-family="Arial, sans-serif" font-weight="700" fill="${theme.accent}">${escapeXml(
        game.category === "math" ? "Math Lab" : "Arcade Lab"
      )}</text>
      ${lineMarkup}
      <text x="44" y="560" font-size="26" font-family="Arial, sans-serif" fill="rgba(255,255,255,0.88)">${escapeXml(
        game.status === "live" ? "Playable now in MathShield" : "Catalog card ready"
      )}</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
