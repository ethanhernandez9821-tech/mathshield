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
    slug: "survival-shooter",
    title: "Survival Shooter",
    description: "Top-down shooter with bots, perks, and crosshair aim.",
    category: "arcade",
    thumbnail: "/thumbs/survival-shooter",
    status: "live",
    theme: "cyan",
  },
  {
    slug: "arena-pvp",
    title: "Arena PvP",
    description: "Arena shooter with bots, pickups, and quick rounds.",
    category: "arcade",
    thumbnail: "/thumbnails/arena-pvp.png",
    status: "live",
    theme: "rose",
  },
  {
    slug: "cosmos-wars",
    title: "Cosmos Wars",
    description: "Space shooter with bosses and quick runs.",
    category: "arcade",
    thumbnail: "/thumbnails/cosmos-wars.jpg",
    status: "live",
    theme: "orange",
  },
  {
    slug: "micro-shooters",
    title: "Micro Shooters",
    description: "Arcade shooter with bosses and upgrade picks.",
    category: "arcade",
    thumbnail: "/thumbnails/micro-shooters.png",
    status: "live",
    theme: "rose",
  },
  {
    slug: "star-trooper",
    title: "Star Trooper",
    description: "Stage-based space shooter with score chasing.",
    category: "arcade",
    thumbnail: "/thumbs/star-trooper",
    status: "live",
    theme: "gold",
  },
  {
    slug: "xquest-js",
    title: "XQuest JS",
    description: "Fast arcade shooter with bombs and power stars.",
    category: "arcade",
    thumbnail: "/thumbs/xquest-js",
    status: "live",
    theme: "violet",
  },
  {
    slug: "three-fps",
    title: "Three FPS",
    description: "Wave FPS with map votes, loadouts, and upgrades.",
    category: "arcade",
    thumbnail: "/thumbs/three-fps",
    status: "live",
    theme: "rose",
  },
  {
    slug: "vibe-fps",
    title: "VibeFPS",
    description: "3D target shooter with settings and quick rounds.",
    category: "arcade",
    thumbnail: "/thumbnails/vibe-fps.png",
    status: "live",
    theme: "cyan",
  },
  {
    slug: "n-gon",
    title: "n-gon",
    description: "Movement combat with physics and a full controls menu.",
    category: "arcade",
    thumbnail: "/thumbs/n-gon",
    status: "live",
    theme: "violet",
  },
  {
    slug: "hexgl",
    title: "HexGL",
    description: "3D hover racer with menus and time trials.",
    category: "arcade",
    thumbnail: "/thumbnails/hexgl.png",
    status: "live",
    theme: "orange",
  },
  {
    slug: "tux-racer",
    title: "Tux Racer",
    description: "Downhill snow racer with long tracks and fast turns.",
    category: "arcade",
    thumbnail: "/thumbnails/tux-racer.webp",
    status: "live",
    theme: "lime",
  },
  {
    slug: "drift-boss",
    title: "Drift Boss",
    description: "One-button drifter with fast retries.",
    category: "arcade",
    thumbnail: "/thumbnails/drift-boss.png",
    status: "live",
    theme: "lime",
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
