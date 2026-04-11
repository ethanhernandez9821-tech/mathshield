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
    description: "A pseudo-3D arena shooter with bot fights, gun pickups, and mouse-led aiming built for faster combat rounds.",
    category: "arcade",
    thumbnail: "/thumbnails/arena-pvp.png",
    status: "live",
    theme: "rose",
  },
  {
    slug: "survival-shooter",
    title: "Survival Shooter",
    description: "A modern top-down survival shooter with enemy gunners, perk builds, reload timing, and real mouse aim.",
    category: "arcade",
    thumbnail: "/thumbs/survival-shooter",
    status: "live",
    theme: "cyan",
  },
  {
    slug: "zombie-attack",
    title: "Zombie Attack",
    description: "A real zombie shooter import with horde pressure, score chasing, and cleaner action than the retro arcade set.",
    category: "arcade",
    thumbnail: "/thumbnails/zombie-attack.png",
    status: "live",
    theme: "lime",
  },
  {
    slug: "star-trooper",
    title: "Star Trooper",
    description: "A cleaner space combat import with enemy waves, laser fire, and a sharper arcade loop.",
    category: "arcade",
    thumbnail: "/thumbnails/star-trooper.png",
    status: "live",
    theme: "orange",
  },
  {
    slug: "xquest",
    title: "XQuest JS",
    description: "A fast HTML5 combat game with mouse shooting, enemy swarms, bombs, and momentum-heavy dodging.",
    category: "arcade",
    thumbnail: "/thumbs/xquest",
    status: "live",
    theme: "violet",
  },
  {
    slug: "elemental-tower-defense",
    title: "Elemental Tower Defense",
    description: "A full tower defense game with elemental towers, waves, upgrades, and multiple map difficulties.",
    category: "arcade",
    thumbnail: "/thumbnails/elemental-td.png",
    status: "live",
    theme: "gold",
  },
  {
    slug: "tower-conquest",
    title: "Tower Conquest",
    description: "A real-time tower capture strategy game with AI pressure, lane control, and live tower battles.",
    category: "arcade",
    thumbnail: "/thumbnails/tower-conquest.png",
    status: "live",
    theme: "cyan",
  },
  {
    slug: "drift-boss",
    title: "Drift Boss",
    description: "A fast one-button drifter that still fits the arcade when you want a break between shooters and defense maps.",
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
