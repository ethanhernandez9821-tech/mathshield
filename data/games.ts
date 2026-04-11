export type Game = {
  slug: string;
  title: string;
  description: string;
  category: "math" | "educational" | "arcade";
  thumbnail: string;
};

export const games: Game[] = [
  {
    slug: "drift-boss",
    title: "Drift Boss",
    description:
      "A tight one-button drifter with a fast restart loop and a clean embedded play screen.",
    category: "arcade",
    thumbnail: "/thumbnails/drift-boss.png",
  },
];
