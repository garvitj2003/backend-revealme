import { Hono } from "hono";
import { cors } from "hono/cors";
import { createQuiz } from "./routes/create-quiz";
import { generateQuiz } from "./routes/generate-quiz";
import { count } from "./routes/count";
import { LeaderBoard } from "./routes/leaderboard";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.use(
  "/*",
  cors({
    origin: [
      "http://localhost:3000",
      "https://knowyourfriends.vercel.app",
      "https://quiz-me.vercel.app",
    ],
  })
);
app.route("/api/v1/create-quiz", createQuiz);
app.route("/api/v1/generate-quiz", generateQuiz);
app.route("/api/v1/leaderboard", LeaderBoard);
app.route("/api/v1/count", count);
export default app;
