import { Hono } from "hono";
import { cors } from "hono/cors";
import { summonerApi } from "./routes/summoner";

export const app = new Hono()
  .basePath("/api")
  .use("*", cors())
  .get("/hello", (c) => c.text("Hello world!"))
  .route("/summoner", summonerApi);

export type AppType = typeof app;
