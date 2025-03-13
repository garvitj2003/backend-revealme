import { Hono } from "hono";
import { cors } from "hono/cors";
import { createQuiz } from "./routes/create-quiz";
import { generateQuiz } from "./routes/generate-quiz";
import { count } from "./routes/count";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

const allowedOrigins = [
  "http://localhost:3000",
  "https://knowyourfriends.vercel.app",
];

app.use(
  "/*",
  cors({
    origin: (origin) => (allowedOrigins.includes(origin) ? origin : undefined),
    allowMethods: ["GET", "POST", "OPTIONS", "PUT"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);
app.route("/api/v1/create-quiz", createQuiz);
app.route("/api/v1/generate-quiz", generateQuiz);
app.route("/api/v1/count", count);
export default app;
