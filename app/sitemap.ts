import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { games } from "@/data/games";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/arcade",
    "/games",
    "/login",
    "/profile",
    "/signup",
  ];

  const gameRoutes = games
    .filter((game) => game.status === "live")
    .map((game) => `/${game.category === "arcade" ? "arcade" : "games"}/${game.slug}`);

  const routes = [...staticRoutes, ...gameRoutes];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
