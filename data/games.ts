export type GameCategory = "math" | "arcade";
export type GameStatus = "live" | "planned";
export type GameTheme = "cyan" | "orange" | "lime" | "violet" | "rose" | "gold";

export type Game = {
  slug: string;
  title: string;
  description: string;
  category: GameCategory;
  thumbnail: string;
  status: GameStatus;
  theme: GameTheme;
};

export const games: Game[] = [
  {
    slug: "arena-pvp",
    title: "Arena PvP",
    description: "A sharper arena shooter with bot fights, pickups, split-screen roots, and real menu-driven matches instead of filler arcade junk.",
    category: "arcade",
    thumbnail: "/thumbnails/arena-pvp.png",
    status: "live",
    theme: "rose",
  },
  {
    slug: "survival-shooter",
    title: "Survival Shooter",
    description: "A modern top-down survival shooter with a real launcher menu, perk library, enemy showcase, and mouse-led combat.",
    category: "arcade",
    thumbnail: "/thumbs/survival-shooter",
    status: "live",
    theme: "cyan",
  },
  {
    slug: "drift-boss",
    title: "Drift Boss",
    description: "A fast one-button drifter with quick retries and a cleaner skill loop between the bigger combat and defense games.",
    category: "arcade",
    thumbnail: "/thumbnails/drift-boss.png",
    status: "live",
    theme: "lime",
  },
  {
    slug: "hexgl",
    title: "HexGL",
    description: "A polished futuristic HTML5 racer with its own menu, settings, and a much stronger arcade feel than the random filler imports.",
    category: "arcade",
    thumbnail: "/thumbnails/hexgl.png",
    status: "live",
    theme: "orange",
  },
  {
    slug: "n-gon",
    title: "n-gon",
    description: "A physics-heavy platform combat game with built-in settings, controls, training, and the closest legit parkour-combat vibe in the lineup.",
    category: "arcade",
    thumbnail: "/thumbs/n-gon",
    status: "live",
    theme: "violet",
  },
  {
    slug: "2048",
    title: "2048",
    description: "A real imported number puzzle where matching tiles merge into bigger values until you reach 2048.",
    category: "math",
    thumbnail: "/thumbs/2048",
    status: "live",
    theme: "gold",
  },
];

export function getGameBySlug(slug: string) {
  return games.find((game) => game.slug === slug) ?? null;
}
