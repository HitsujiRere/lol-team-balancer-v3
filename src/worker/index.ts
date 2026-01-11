/// <reference path="../../worker-configuration.d.ts" />
import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

const routes = app.get("/api/time", (c) => {
  return c.json({ time: new Date().toLocaleString() });
});

export type AppType = typeof routes;

export default app;
