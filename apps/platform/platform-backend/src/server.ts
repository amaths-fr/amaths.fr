import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { Environment, handleError, Logger } from "@amaths/backend-framework";
import { serve } from "@hono/node-server";
import { globalBoot } from "./boot/globalBoot";
import { bootRoutes } from "./boot/bootRoutes";

const app = new Hono();

app.use(logger());
app.use(
  cors({
    origin: [Environment.get("LANDING_PAGE_ORIGIN")],
  }),
);

const oops = Logger.for("Server");

const { intentBus } = globalBoot();

app.route("/api", bootRoutes(intentBus));

app.onError(handleError(oops));

serve(
  {
    fetch: app.fetch,
    hostname: "0.0.0.0",
    port: Number.parseInt(Environment.get("PORT"), 10),
  },
  console.log,
);
