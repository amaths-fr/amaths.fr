import { Command, CommandHandler } from "@amaths/backend-framework";
import type { LeadStore } from "../lead.store";
import type { Lead } from "../../domain/lead";

export class CreateLeadCommand extends Command {
  constructor(
    readonly payload: {
      lead: Lead;
    },
  ) {
    super();
  }
}

export class CreateLeadCommandHandler extends CommandHandler(
  CreateLeadCommand,
) {
  constructor(private readonly leadStore: LeadStore) {
    super();
  }

  async execute(command: CreateLeadCommand) {
    await this.leadStore.save(command.payload.lead);
  }
}
