import { games } from "@/data/games";

function daySeed(date = new Date()) {
  return Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86400000);
}

export function getDailyFeaturedGame() {
  const arcadeGames = games.filter((game) => game.category === "arcade");

  if (arcadeGames.length === 0) {
    throw new Error("No arcade games are available to feature.");
  }

  const index = daySeed() % arcadeGames.length;
  return arcadeGames[index];
}
