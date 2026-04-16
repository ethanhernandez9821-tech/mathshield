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
    description: "A real top-down survival shooter with a launcher menu, perk screens, enemy shooters, and crosshair-led combat.",
    category: "arcade",
    thumbnail: "/thumbs/survival-shooter",
    status: "live",
    theme: "cyan",
  },
  {
    slug: "arena-pvp",
    title: "Arena PvP",
    description: "A pseudo-3D arena shooter with bot fights, pickups, and mouse-led gunplay that feels closer to a real combat sandbox.",
    category: "arcade",
    thumbnail: "/thumbnails/arena-pvp.png",
    status: "live",
    theme: "rose",
  },
  {
    slug: "cosmos-wars",
    title: "Cosmos Wars",
    description: "A polished Phaser space shooter with pointer-led aiming, player name entry, enemy pressure, and a real arcade flow.",
    category: "arcade",
    thumbnail: "/thumbnails/cosmos-wars.jpg",
    status: "live",
    theme: "orange",
  },
  {
    slug: "micro-shooters",
    title: "Micro Shooters",
    description: "A level-based arcade shooter with boss fights, upgrades, mobile controls, and a much fuller progression loop.",
    category: "arcade",
    thumbnail: "/thumbnails/micro-shooters.png",
    status: "live",
    theme: "rose",
  },
  {
    slug: "star-trooper",
    title: "Star Trooper",
    description: "A three-stage Phaser space shooter with score chasing, stage progression, and a cleaner old-school arcade feel.",
    category: "arcade",
    thumbnail: "/thumbs/star-trooper",
    status: "live",
    theme: "gold",
  },
  {
    slug: "xquest-js",
    title: "XQuest JS",
    description: "A momentum-heavy HTML5 shooter with mouse, touch, and keyboard controls, power stars, bombs, and fast arcade pacing.",
    category: "arcade",
    thumbnail: "/thumbs/xquest-js",
    status: "live",
    theme: "violet",
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
    slug: "hexgl",
    title: "HexGL",
    description: "A polished futuristic HTML5 racer with its own menu, settings, and a sharper arcade feel than the weak filler imports.",
    category: "arcade",
    thumbnail: "/thumbnails/hexgl.png",
    status: "live",
    theme: "orange",
  },
  {
    slug: "drift-boss",
    title: "Drift Boss",
    description: "A fast one-button drifter with quick retries and a cleaner skill loop between the heavier shooters.",
    category: "arcade",
    thumbnail: "/thumbnails/drift-boss.png",
    status: "live",
    theme: "lime",
  },
  {
    slug: "basketball-challenge",
    title: "Basketball Challenge",
    description: "A real imported canvas basketball game with shot timing, power control, angle selection, and a proper sports break in the arcade.",
    category: "arcade",
    thumbnail: "/thumbnails/basketball-challenge.png",
    status: "live",
    theme: "gold",
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
