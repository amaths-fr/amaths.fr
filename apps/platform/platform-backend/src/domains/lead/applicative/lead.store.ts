import type { Lead } from "../domain/lead";

export interface LeadStore {
  save: (lead: Lead) => Promise<void>;
}
