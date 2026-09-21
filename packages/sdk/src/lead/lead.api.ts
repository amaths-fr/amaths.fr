import { Contract } from "@amaths/sdk-toolkit";
import { SimpleLeadSchema } from "./lead.schemas";

export const LeadApi = {
  PlanTrial: Contract.forSilentCommand({
    path: "/lead/plan-trial",
    withAuth: false,
    bodySchema: SimpleLeadSchema,
  }),
} as const;
