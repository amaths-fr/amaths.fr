import { InMemoryIntentBus } from "@amaths/backend-framework";
import { bootLead } from "../domains/lead/boot/bootLead";

export function globalBoot() {
  const intentBus = new InMemoryIntentBus();

  bootLead(intentBus);

  return { intentBus };
}
