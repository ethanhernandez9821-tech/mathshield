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
    slug: "drift-boss",
    title: "Drift Boss",
    description: "A tight one-button drifter with a fast restart loop and a clean embedded play screen.",
    category: "arcade",
    thumbnail: "/thumbnails/drift-boss.png",
    status: "live",
    theme: "lime",
  },
  {
    slug: "pacman",
    title: "Pac-Man Canvas",
    description: "A real HTML5 Pac-Man build with canvas movement, ghosts, power pellets, and arcade pacing.",
    category: "arcade",
    thumbnail: "/games/pacman/img/Icon-200x200.png",
    status: "live",
    theme: "gold",
  },
  {
    slug: "asteroids",
    title: "Asteroids",
    description: "A real imported space shooter with thrust, rotation, lasers, and old-school arcade movement.",
    category: "arcade",
    thumbnail: "/thumbs/asteroids",
    status: "live",
    theme: "violet",
  },
  {
    slug: "breakout",
    title: "Breakout",
    description: "A real imported brick breaker with levels, paddle control, and classic arcade bounce timing.",
    category: "arcade",
    thumbnail: "/thumbs/breakout",
    status: "live",
    theme: "orange",
  },
  {
    slug: "pong",
    title: "Pong",
    description: "A real imported Pong build with single-player, two-player, and fast back-and-forth volleys.",
    category: "arcade",
    thumbnail: "/thumbs/pong",
    status: "live",
    theme: "cyan",
  },
  {
    slug: "boulderdash",
    title: "Boulder Dash",
    description: "A real imported maze-digging game with falling rocks, diamonds, and route-planning pressure.",
    category: "arcade",
    thumbnail: "/thumbs/boulderdash",
    status: "live",
    theme: "rose",
  },
  {
    slug: "tetris",
    title: "Tetris",
    description: "A real imported falling-block classic with keyboard controls and fast score-chasing loops.",
    category: "arcade",
    thumbnail: "/thumbs/tetris",
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
