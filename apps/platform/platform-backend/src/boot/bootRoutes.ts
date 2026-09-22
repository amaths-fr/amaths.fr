import type { IntentBus } from "@amaths/backend-framework";
import { HonoRouter, UserId } from "@amaths/backend-framework";
import { bootLeadRoutes } from "../domains/lead/boot/bootLeadRoutes";
import { Hono } from "hono";

export function bootRoutes(intentBus: IntentBus) {
  const hono = new Hono();

  const router = new HonoRouter(hono, async () => ({
    id: UserId.null(),
  }));
  bootLeadRoutes(router, intentBus);

  return hono;
}
