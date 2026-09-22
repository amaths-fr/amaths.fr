import type { z } from "zod";
import type { SimpleLeadSchema } from "./lead.schemas";

export type SimpleLead = z.infer<typeof SimpleLeadSchema>;
