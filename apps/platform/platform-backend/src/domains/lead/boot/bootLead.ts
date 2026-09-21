import type { IntentBus } from "@amaths/backend-framework";
import { Environment } from "@amaths/backend-framework";
import { CreateLeadCommandHandler } from "../applicative/commands/createLead.command";
import {
  AirtableConfig,
  AirtableLeadStore,
} from "../infrastructure/airtable.lead.store";
import Airtable from "airtable";

export function bootLead(intentBus: IntentBus) {
  const airtable = new Airtable({
    apiKey: Environment.get("AIRTABLE_TOKEN"),
  }).base(AirtableConfig.BASE_ID);
  const airtableLeadStore = new AirtableLeadStore(airtable);

  intentBus.register(new CreateLeadCommandHandler(airtableLeadStore));
}
