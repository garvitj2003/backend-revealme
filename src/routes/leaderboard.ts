import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";

export const LeaderBoard = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    prisma: any;
  };
}>();

LeaderBoard.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

LeaderBoard.get("/", async (c) => {
  const prisma = c.get("prisma");
  const quizId = c.req.query("quizId");
  try {
    const leaderboard = await prisma.LeaderboardEntry.findMany({
      where: {
        quizId,
      },
      orderBy: {
        score: "desc",
      },
    });
    return c.json({ success: true, data: leaderboard });
  } catch (error) {
    console.log(error);
    return c.json({ success: false, status: 411 });
  }
});

LeaderBoard.post("/", async (c) => {
  const prisma = c.get("prisma");
  const { quizId, score, playerName } = await c.req.json();

  try {
    const leaderboard = await prisma.LeaderboardEntry.create({
      data: {
        quizId,
        score,
        playerName,
      },
    });
    return c.json({ success: true, data: leaderboard });
  } catch (error) {
    console.log(error);
    return c.json({ success: false });
  }
});
