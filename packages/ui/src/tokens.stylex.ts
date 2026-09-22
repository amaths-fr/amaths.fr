import { defineVars } from "@stylexjs/stylex";

export const Color = defineVars({
  PRIMARY: "#14205c",
  PRIMARY_LIGHT: "#5466b7",
  PRIMARY_TERN: "#555e8a",
  ACCENT: "#ebbe36",
  ACCENT_HOVERED: "rgb(235 190 54 / 0.75)",
  ACCENT_TERN: "#fbf2d7",

  WHITE: "#f5f5f5",
  ABSOLUTE_WHITE: "#ffffff",

  ELEVATION_1: "#f5f6fa",
  ELEVATION_2: "#dbdfec",
  ELEVATION_3: "#d5d9ed",
  ELEVATION_4: "#dde0f1",

  TRANSLUCID_1: "rgba(84, 102, 183, 0.1)",

  ERROR_BORDER: "#d64545",
  ERROR_OUTLINE: "rgba(214, 69, 69, 0.15)",

  SECTION_GRADIENT_1:
    "linear-gradient(180deg, rgba(158, 168, 204, 0.5) 0%, rgba(255, 255, 255, 0) 100%)",
  SECTION_GRADIENT_2:
    "linear-gradient(180deg, rgba(158, 168, 204, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
  SECTION_GRADIENT_3:
    "linear-gradient(145deg, rgba(84, 102, 183, 0.1) 0%, rgba(20, 32, 92, 0.05) 100%)",
} as const);

export const Spacing = defineVars({
  S4: "4px",
  S8: "8px",
  S12: "12px",
  S16: "16px",
  S24: "24px",
  S32: "32px",
  S48: "48px",
  S64: "64px",
  S96: "96px",
  S128: "128px",
  S192: "192px",
  S256: "256px",
} as const);

export const FontFamily = defineVars({
  DEFAULT: '"Open Sans", sans-serif',
  TITLE: '"Tinos", serif',
} as const);

export const FontSize = defineVars({
  H1: "3rem",
  H2: "3rem",
  H3: "2.4rem",
  H4: "1.5rem",
  BODY: "1rem",
} as const);

export const FontWeight = defineVars({
  REGULAR: "400",
  MEDIUM: "600",
  SEMI_BOLD: "700",
  BOLD: "800",
  BLACK: "900",
} as const);

export const Radius = defineVars({
  R8: "8px",
  R16: "16px",
  R24: "24px",
  R_MAX: "1000px",
  R_ROUND: "100%",
} as const);
