// oxlint-disable-next-line typescript/no-extraneous-class
export class Environment {
  static get(key: string) {
    const value = process.env[key];

    if (value === undefined) {
      throw new Error(`Environment variable '${key}' is missing`);
    }

    return value;
  }
}
