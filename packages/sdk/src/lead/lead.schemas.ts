import { z } from "zod";

export const SimpleLeadSchema = z.object({
  displayName: z.string(),
  role: z.enum(["student", "parent"]),
  email: z.email("Un email valide est requis"),
  phoneNumber: z.string(),
  grade: z.enum(["seconde", "premiere", "terminale", "prepa-1", "prepa-2"]),
  attendance: z.enum(["in-person", "remote"]),
});
