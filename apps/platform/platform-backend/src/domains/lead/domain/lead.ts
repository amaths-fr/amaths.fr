import { Choice, Shape } from "@ddd-ts/shape";

export class Lead extends Shape({
  displayName: String,
  role: Choice(["student", "parent"]),
  email: String,
  phoneNumber: String,
  grade: Choice(["seconde", "premiere", "terminale", "prepa-1", "prepa-2"]),
  attendance: Choice(["in-person", "remote"]),
}) {}
