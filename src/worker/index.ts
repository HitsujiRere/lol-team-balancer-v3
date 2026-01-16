/// <reference path="../../worker-configuration.d.ts" />

import { Hono } from "hono";
import { logger } from "hono/logger";
import { summonersApp } from "./routes/summoners";

const app = new Hono().basePath("/api");

app.use(logger());

const routes = app
  .get("/time", (c) => {
    return c.json({ time: new Date().toLocaleString() });
  })
  .route("/summoners", summonersApp);

export type AppType = typeof routes;

export default app;
