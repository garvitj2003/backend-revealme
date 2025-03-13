import { Prisma, PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";

export const createQuiz = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    prisma: any;
  };
}>();

createQuiz.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});
createQuiz.get("/", async (c) => {
  const creatorId = c.req.query("creatorId");
  const prisma = c.get("prisma");
  try {
    const rawQuiz = await prisma.rawQuiz.findUnique({
      where: { creatorId },
      include: {
        questions: {
          select: { id: true, text: true, selected: true, options: true },
        },
      },
    });
    return c.json({ data: rawQuiz });
  } catch (error) {
    console.log(error);
    return c.json({ success: false });
  }
});
createQuiz.post("/", async (c) => {
  const { creatorId, questions } = await c.req.json();
  const prisma = c.get("prisma");
  try {
    const rawQuiz = await prisma.rawQuiz.create({
      data: {
        creatorId: creatorId,
      },
    });
    const finalQuestions = questions.map((question: any) => {
      return {
        ...question,
        creatorId,
      };
    });
    // console.log(finalQuestions);
    const rawQuestions = await prisma.rawQuestion.createMany({
      data: finalQuestions,
    });
    return c.json({ success: true, data: rawQuiz, finalQuestions });
  } catch (e) {
    console.log(e);
    return c.json({ success: false, status: 411 });
  }
});
