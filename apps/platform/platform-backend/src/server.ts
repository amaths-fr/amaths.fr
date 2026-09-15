import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { Environment, handleError, Logger } from "@amaths/backend-framework";
import { serve } from "@hono/node-server";

const app = new Hono();

app.use(logger());
app.use(cors());

const oops = Logger.for("Server");

app.onError(handleError(oops));

serve(
  {
    fetch: app.fetch,
    hostname: "0.0.0.0",
    port: Number.parseInt(Environment.get("PORT"), 10),
  },
  console.log,
);
