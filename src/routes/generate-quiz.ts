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

generateQuiz.get("/", async (c) => {
  const prisma = c.get("prisma");
  const quizId = c.req.query("quizId");
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        questions: true,
      },
    });
    return c.json({ data: quiz });
  } catch (error) {
    c.json({ success: false });
    console.log(error);
  }
});

generateQuiz.post("/", async (c) => {
  const prisma = c.get("prisma");
  const { creatorId, name, questions, title } = await c.req.json();
  try {
    const quiz = await prisma.quiz.create({
      data: {
        creatorId,
        name,
        title,
      },
    });

    const finalQuestion = questions.map((question: any) => {
      return {
        ...question,
        quizId: quiz.id,
      };
    });
    const question = await prisma.question.createMany({
      data: finalQuestion,
    });
    return c.json({ success: true, data: quiz, finalQuestion });
  } catch (e) {
    console.log(e);
    return c.json({ success: false, status: 411 });
  }
});
