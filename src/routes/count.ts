import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
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

count.post("/submit", async (c) => {
  const prisma = c.get("prisma");
  try {
    await prisma.stats.update({
      where: { id: 1 },
      data: { total_submssion: { increment: 1 } },
    });
  } catch (error) {
    console.log(error);
  }
});

count.get("/total", async (c) => {
  const prisma = c.get("prisma");
  try {
    const quizCount = await prisma.quiz.count();
    const submitCount = await prisma.stats.findUnique({
      where: { id: 1 },
    });
    const totalCount = quizCount + submitCount?.total_submission;
    return c.json({ count: totalCount });
  } catch (error) {
    console.log(error);
  }
});
