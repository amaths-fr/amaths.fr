import type { LeadStore } from "../applicative/lead.store";
import type { Lead } from "../domain/lead";
import type Airtable from "airtable";

export const AirtableConfig = {
  BASE_ID: "app4P7EYBLtk8rVRv",
  TABLE_ID: "tbl83VFz9q0v7wKiQ",

  Fields: {
    DISPLAY_NAME: "fldejwnhAOzfXqN6f",
    ROLE: "fldVelpEs4AjD5Wiz",
    EMAIL: "fldcVCti53VLdSh0V",
    PHONE_NUMBER: "fldk7eqW5q8sRsyhB",
    GRADE: "fld1aWsVqc0slS0hb",
    ATTENDANCE: "fldERUYJWoHtCr6Ga",
    STATUS: "fldWJ91H3rh3aPKNb",
  },

  RoleOptions: {
    student: "Un étudiant",
    parent: "Un parent",
  },

  GradeOptions: {
    seconde: "Seconde",
    premiere: "Première",
    terminale: "Terminale",
    "prepa-1": "CPGE 1ère année (MPSI, PCSI, ECG...)",
    "prepa-2": "CPGE 2ème année (MP, PC, PSI, ECG...)",
  },

  AttendanceOptions: {
    "in-person": "Présentiel (Nantes)",
    remote: "Distanciel (Microsoft Teams)",
  },
} as const;

export class AirtableLeadStore implements LeadStore {
  constructor(private readonly airtable: Airtable.Base) {}

  async save(lead: Lead) {
    await this.airtable.table(AirtableConfig.TABLE_ID).create([
      {
        fields: {
          [AirtableConfig.Fields.DISPLAY_NAME]: lead.displayName,
          [AirtableConfig.Fields.ROLE]: AirtableConfig.RoleOptions[lead.role],
          [AirtableConfig.Fields.EMAIL]: lead.email,
          [AirtableConfig.Fields.PHONE_NUMBER]: lead.phoneNumber,
          [AirtableConfig.Fields.GRADE]:
            AirtableConfig.GradeOptions[lead.grade],
          [AirtableConfig.Fields.ATTENDANCE]:
            AirtableConfig.AttendanceOptions[lead.attendance],
        },
      },
    ]);
  }
}
