import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { cache } from "hono/cache";
import { withAccelerate } from "@prisma/extension-accelerate";

export const count = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    prisma: any;
  };
}>();

count.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

// Apply Hono's built-in cache middleware to the /total endpoint
count.get("/total", 
  cache({
    cacheName: "count-cache", 
    cacheControl: "max-age=900, stale-while-revalidate=60", // 15 minutes with 1 minute stale
    vary: ["Accept"],
  }),
  async (c) => {
    const prisma = c.get("prisma");
    try {
      const quizCount = await prisma.quiz.count();
      const submitCount = await prisma.LeaderboardEntry.count();
      const totalCount = quizCount + submitCount;
      return c.json({ count: totalCount });
    } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch counts" }, 500);
    }
  }
);