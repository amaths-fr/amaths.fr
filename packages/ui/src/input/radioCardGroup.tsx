import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as stylex from "@stylexjs/stylex";
import {
  Color,
  FontFamily,
  FontWeight,
  Radius,
  Spacing,
} from "../tokens.stylex";

const styles = stylex.create({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: Spacing.S16,
    width: "100%",
  },
  card: {
    display: "flex",
    alignItems: "center",
    gap: Spacing.S12,
    textAlign: "left",
    fontFamily: FontFamily.DEFAULT,
    backgroundColor: Color.ABSOLUTE_WHITE,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: {
      default: Color.ELEVATION_3,
      ":hover": Color.PRIMARY_TERN,
    },
    borderRadius: Radius.R16,
    padding: Spacing.S16,
    cursor: "pointer",
    outline: "none",
    boxShadow: {
      default: "none",
      ":focus-visible": `0 0 0 3px ${Color.TRANSLUCID_1}`,
    },
    transitionProperty: "border-color, background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  cardSelected: {
    borderColor: {
      default: Color.PRIMARY_LIGHT,
      ":hover": Color.PRIMARY_LIGHT,
    },
    backgroundColor: Color.TRANSLUCID_1,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: Color.PRIMARY_TERN,
  },
  iconSelected: {
    color: Color.PRIMARY_LIGHT,
  },
  textGroup: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.S4,
  },
  label: {
    fontSize: "1rem",
    fontWeight: FontWeight.SEMI_BOLD,
    color: Color.PRIMARY,
  },
  description: {
    fontSize: "0.875rem",
    color: Color.PRIMARY_TERN,
  },
});

export interface RadioCardOption<Value extends string> {
  value: Value;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface RadioCardGroupProps<Value extends string> {
  value: Value | undefined;
  onValueChange: (value: Value) => void;
  options: ReadonlyArray<RadioCardOption<Value>>;
  name?: string;
  disabled?: boolean;
  onBlur?: () => void;
  "aria-labelledby"?: string;
}

export function RadioCardGroup<Value extends string>({
  value,
  onValueChange,
  options,
  name,
  disabled,
  onBlur,
  ...aria
}: RadioCardGroupProps<Value>) {
  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={(next) => onValueChange(next as Value)}
      name={name}
      disabled={disabled}
      onBlur={onBlur}
      {...stylex.props(styles.root)}
      {...aria}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <RadioGroupPrimitive.Item
            key={option.value}
            value={option.value}
            {...stylex.props(styles.card, selected && styles.cardSelected)}
          >
            {option.icon && (
              <span
                {...stylex.props(styles.icon, selected && styles.iconSelected)}
              >
                {option.icon}
              </span>
            )}
            <span {...stylex.props(styles.textGroup)}>
              <span {...stylex.props(styles.label)}>{option.label}</span>
              {option.description && (
                <span {...stylex.props(styles.description)}>
                  {option.description}
                </span>
              )}
            </span>
          </RadioGroupPrimitive.Item>
        );
      })}
    </RadioGroupPrimitive.Root>
  );
}
