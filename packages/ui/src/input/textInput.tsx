import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import { Color, FontFamily, FontSize, Radius, Spacing } from "../tokens.stylex";

const styles = stylex.create({
  root: {
    width: "100%",
    boxSizing: "border-box",
    fontFamily: FontFamily.DEFAULT,
    fontSize: FontSize.BODY,
    color: Color.PRIMARY,
    backgroundColor: Color.ABSOLUTE_WHITE,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: Color.ELEVATION_3,
      ":hover": Color.PRIMARY_TERN,
      ":focus-visible": Color.PRIMARY_LIGHT,
    },
    borderRadius: Radius.R8,
    paddingBlock: Spacing.S12,
    paddingInline: Spacing.S16,
    outline: "none",
    boxShadow: {
      default: "none",
      ":focus-visible": `0 0 0 3px ${Color.TRANSLUCID_1}`,
    },
    transitionProperty: "border-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    "::placeholder": {
      color: Color.PRIMARY_TERN,
      opacity: 0.6,
    },
  },
  invalid: {
    borderColor: {
      default: Color.ERROR_BORDER,
      ":hover": Color.ERROR_BORDER,
      ":focus-visible": Color.ERROR_BORDER,
    },
    boxShadow: {
      default: "none",
      ":focus-visible": `0 0 0 3px ${Color.ERROR_OUTLINE}`,
    },
  },
  disabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    backgroundColor: Color.ELEVATION_1,
  },
});

export interface InputProps extends Omit<
  React.ComponentPropsWithoutRef<"input">,
  "onChange" | "value"
> {
  value?: string;
  onChangeText?: (value: string) => void;
  invalid?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ value, onChangeText, invalid, disabled, ...rest }, ref) {
    const stylexAttrs = stylex.props(
      styles.root,
      invalid && styles.invalid,
      disabled && styles.disabled,
    );

    return (
      <input
        {...rest}
        ref={ref}
        disabled={disabled}
        value={value}
        aria-invalid={invalid || undefined}
        onChange={(event) => onChangeText?.(event.target.value)}
        className={[stylexAttrs.className, rest.className]
          .filter(Boolean)
          .join(" ")}
        style={{ ...stylexAttrs.style, ...rest.style }}
      />
    );
  },
);
