import { Hono } from "hono";
import { profilesApp } from "./profiles";

export const summonersApp = new Hono().route("/profiles", profilesApp);
