import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import * as stylex from "@stylexjs/stylex";
import { Color, FontFamily, FontSize, Radius, Spacing } from "../tokens.stylex";

const styles = stylex.create({
  trigger: {
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.S8,
    fontFamily: FontFamily.DEFAULT,
    fontSize: "1rem",
    color: Color.PRIMARY,
    backgroundColor: Color.ABSOLUTE_WHITE,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: Color.ELEVATION_3,
      ":hover": Color.PRIMARY_TERN,
    },
    borderRadius: Radius.R8,
    paddingBlock: Spacing.S12,
    paddingInline: Spacing.S16,
    outline: "none",
    boxShadow: {
      default: "none",
      ":focus-visible": `0 0 0 3px ${Color.TRANSLUCID_1}`,
    },
    cursor: "pointer",
    transitionProperty: "border-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  triggerInvalid: {
    borderColor: Color.ERROR_BORDER,
  },
  triggerDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
    backgroundColor: Color.ELEVATION_1,
  },
  placeholder: {
    color: Color.PRIMARY_TERN,
  },
  icon: {
    color: Color.PRIMARY_TERN,
    lineHeight: 0,
  },
  content: {
    overflow: "hidden",
    backgroundColor: Color.ABSOLUTE_WHITE,
    borderRadius: Radius.R8,
    border: `1px solid ${Color.ELEVATION_3}`,
    boxShadow: "0 12px 32px rgba(20, 32, 92, 0.16)",
    zIndex: 1000,
  },
  viewport: {
    padding: Spacing.S4,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.S8,
    fontFamily: FontFamily.DEFAULT,
    fontSize: FontSize.BODY,
    color: Color.PRIMARY,
    padding: `${Spacing.S12} ${Spacing.S12}`,
    borderRadius: Radius.R8,
    outline: "none",
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: {
      default: "transparent",
      ":hover": Color.ELEVATION_1,
      ":focus": Color.ELEVATION_1,
    },
  },
  itemIndicator: {
    color: Color.PRIMARY_LIGHT,
    lineHeight: 0,
  },
});

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface SelectOption<Value extends string> {
  value: Value;
  label: string;
}

export interface SelectProps<Value extends string> {
  value: Value | undefined;
  onValueChange: (value: Value) => void;
  options: ReadonlyArray<SelectOption<Value>>;
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
  onBlur?: () => void;
}

export function Select<Value extends string>({
  value,
  onValueChange,
  options,
  placeholder,
  id,
  name,
  disabled,
  invalid,
  onBlur,
}: SelectProps<Value>) {
  return (
    <RadixSelect.Root
      value={value}
      onValueChange={(next) => onValueChange(next as Value)}
      disabled={disabled}
      name={name}
    >
      <RadixSelect.Trigger
        id={id}
        onBlur={onBlur}
        aria-invalid={invalid || undefined}
        {...stylex.props(
          styles.trigger,
          invalid && styles.triggerInvalid,
          disabled && styles.triggerDisabled,
        )}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon {...stylex.props(styles.icon)}>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={8}
          {...stylex.props(styles.content)}
        >
          <RadixSelect.Viewport {...stylex.props(styles.viewport)}>
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                {...stylex.props(styles.item)}
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator
                  {...stylex.props(styles.itemIndicator)}
                >
                  <CheckIcon />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
