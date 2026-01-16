/// <reference path="../../worker-configuration.d.ts" />

import { Hono } from "hono";
import { logger } from "hono/logger";
import { profilesApi } from "./routes/profiles";

const app = new Hono().basePath("/api");

app.use(logger());

const routes = app
  .get("/time", (c) => {
    return c.json({ time: new Date().toLocaleString() });
  })
  .route("/profiles", profilesApi);

export type AppType = typeof routes;

export default app;
