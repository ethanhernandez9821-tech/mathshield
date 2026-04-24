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
    slug: "three-fps",
    title: "Three FPS",
    description: "Wave FPS with map votes, loadouts, and upgrades.",
    category: "arcade",
    thumbnail: "/thumbs/three-fps",
    status: "live",
    theme: "rose",
  },
  {
    slug: "simple-3d-fps",
    title: "Simple 3D FPS",
    description: "BabylonJS shooter with a real 3D arena, weapon model, and enemy waves.",
    category: "arcade",
    thumbnail: "/thumbnails/simple-3d-fps.jpg",
    status: "live",
    theme: "gold",
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
    slug: "enari-engine",
    title: "Enari Engine",
    description: "Imported Three.js FPS with weapon models, physics, and a full arena build.",
    category: "arcade",
    thumbnail: "/thumbnails/enari-engine.webp",
    status: "live",
    theme: "violet",
  },
  {
    slug: "nemesis",
    title: "Nemesis",
    description: "Classic WebGL FPS with enemies, health pickups, radar, score, and mouse aiming.",
    category: "arcade",
    thumbnail: "/thumbnails/nemesis.jpg",
    status: "live",
    theme: "lime",
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
    slug: "drift-boss",
    title: "Drift Boss",
    description: "One-button drifter with fast retries.",
    category: "arcade",
    thumbnail: "/thumbnails/drift-boss.png",
    status: "live",
    theme: "lime",
  },
];

export function getGameBySlug(slug: string) {
  return games.find((game) => game.slug === slug) ?? null;
}
