import { Hono } from "hono";
import { cors } from "hono/cors";
import { createQuiz } from "./routes/create-quiz";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();
app.use("/*", cors());
app.route("/api/v1/create-quiz", createQuiz);
export default app;
