import * as React from "react";
import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";
import { TextInput, type InputProps } from "./textInput";

function formatForDisplay(value: string): string {
  if (!value) {
    return "";
  }

  if (value.startsWith("+")) {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (phoneNumber) {
      return phoneNumber.formatNational();
    }
  }

  return new AsYouType("FR").input(value);
}

export interface PhoneInputProps extends Omit<
  InputProps,
  "value" | "onChangeText" | "type" | "inputMode"
> {
  /** Normalized value, ideally E.164 (e.g. "+33612345678"). */
  value?: string;
  /** Receives the best-effort E.164 normalized value as the user types. */
  onChangeText?: (value: string) => void;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput({ value = "", onChangeText, ...rest }, ref) {
    function handleChangeText(nextText: string) {
      const asYouType = new AsYouType("FR");
      const formatted = asYouType.input(nextText);

      const phoneNumber = asYouType.getNumber();
      const normalized = phoneNumber?.isValid()
        ? phoneNumber.number
        : formatted.replace(/[^\d+]/g, "");
      onChangeText?.(normalized);
    }

    return (
      <TextInput
        {...rest}
        ref={ref}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        value={formatForDisplay(value)}
        onChangeText={handleChangeText}
      />
    );
  },
);
