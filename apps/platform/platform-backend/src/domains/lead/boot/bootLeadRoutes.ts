import type { HonoRouter, IntentBus } from "@amaths/backend-framework";
import { LeadApi } from "@amaths/sdk";
import { CreateLeadCommand } from "../applicative/commands/createLead.command";
import { Lead } from "../domain/lead";

export function bootLeadRoutes(router: HonoRouter<any>, intentBus: IntentBus) {
  router.routeWithoutAuth(LeadApi.PlanTrial, async (payload) => {
    await intentBus.handle(
      new CreateLeadCommand({
        lead: new Lead({
          displayName: payload.displayName,
          email: payload.email,
          grade: payload.grade,
          attendance: payload.attendance,
          role: payload.role,
          phoneNumber: payload.phoneNumber,
        }),
      }),
    );
  });
}
