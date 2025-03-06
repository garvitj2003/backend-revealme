import { Prisma, PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";

export const generateQuiz = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    prisma: any;
  };
}>();

generateQuiz.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

generateQuiz.post("/", async (c) => {
  const prisma = c.get("prisma");
  const { creatorID, name, questions, title } = await c.req.json();
  const quiz = await prisma.quiz.create;
});
