import { Hono } from "hono";
import { logger } from "hono/logger";
import { getSummonerInfo } from "@/services/getSummonerInfo";

export const summonerApi = new Hono()
  .use("*", logger())
  .get("/id/:id", async (c) => {
    const id = c.req.param("id");
    const res = await getSummonerInfo(id);
    if (res.isOk()) {
      return c.json({ puuid: res }, 200);
    } else {
      const error = res.error;
      return c.json({ message: error.message }, error.status);
    }
  });
