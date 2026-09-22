import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import * as Form from "@radix-ui/react-form";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { type SimpleLead, SimpleLeadSchema } from "@amaths/sdk";
import {
  TextInput,
  PhoneInput,
  Select,
  RadioCardGroup,
  type SelectOption,
  type RadioCardOption,
} from "@amaths/ui";
import {
  Color,
  FontFamily,
  FontWeight,
  Radius,
  Spacing,
} from "@amaths/ui/tokens.stylex";

interface SimpleLeadFormProps {
  onSubmit(data: SimpleLead): void | Promise<void>;
  loading: boolean;
  err?: string;
}

interface FormValues {
  firstName: string;
  lastName: string;
  role: SimpleLead["role"];
  email: string;
  phoneNumber: string;
  grade: SimpleLead["grade"];
  attendance: SimpleLead["attendance"];
}

const defaultValues: FormValues = {
  firstName: "",
  lastName: "",
  role: "parent",
  email: "",
  phoneNumber: "",
  grade: "seconde",
  attendance: "remote",
};

const FirstNameSchema = z.string().min(1, "Un prénom est requis");
const LastNameSchema = z.string().min(1, "Un nom est requis");
const PhoneNumberSchema = SimpleLeadSchema.shape.phoneNumber.min(
  1,
  "Un téléphone est requis",
);

const ROLE_OPTIONS: ReadonlyArray<SelectOption<SimpleLead["role"]>> = [
  { value: "parent", label: "Parent" },
  { value: "student", label: "Élève" },
];

const GRADE_OPTIONS: ReadonlyArray<SelectOption<SimpleLead["grade"]>> = [
  { value: "seconde", label: "Seconde" },
  { value: "premiere", label: "Première" },
  { value: "terminale", label: "Terminale" },
  { value: "prepa-1", label: "Prépa 1ère année" },
  { value: "prepa-2", label: "Prépa 2ème année" },
];

function VideoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="5"
        width="11"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13 8.5L17.5 5.75C17.9 5.5 18.5 5.78 18.5 6.25V13.75C18.5 14.22 17.9 14.5 17.5 14.25L13 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 18C10 18 16 12.5 16 8C16 4.68629 13.3137 2 10 2C6.68629 2 4 4.68629 4 8C4 12.5 10 18 10 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const ATTENDANCE_OPTIONS: ReadonlyArray<
  RadioCardOption<SimpleLead["attendance"]>
> = [
  {
    value: "remote",
    label: "Distanciel",
    description: "Cours en visio",
    icon: <VideoIcon />,
  },
  {
    value: "in-person",
    label: "Présentiel",
    description: "À Nantes",
    icon: <MarkerIcon />,
  },
];

function getErrorMessage(errors: ReadonlyArray<unknown>): string | undefined {
  const [firstError] = errors;
  if (firstError == null) {
    return undefined;
  }
  if (typeof firstError === "string") {
    return firstError;
  }
  if (typeof firstError === "object" && "message" in firstError) {
    return String((firstError as { message: unknown }).message);
  }
  return undefined;
}

export function SimpleLeadForm({
  onSubmit,
  loading,
  err,
}: SimpleLeadFormProps) {
  const roleId = React.useId();
  const gradeId = React.useId();
  const attendanceLabelId = React.useId();

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const payload = {
        displayName: `${value.firstName.trim()} ${value.lastName.trim()}`,
        role: value.role,
        email: value.email,
        phoneNumber: value.phoneNumber,
        grade: value.grade,
        attendance: value.attendance,
      };

      const result = SimpleLeadSchema.safeParse(payload);

      if (!result.success) {
        return;
      }

      await onSubmit(result.data);
    },
  });

  return (
    <Form.Root
      noValidate
      {...stylex.props(styles.root)}
      onSubmit={async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (form.state.isSubmitting) {
          return;
        }
        await form.handleSubmit();
      }}
    >
      <div {...stylex.props(styles.row)}>
        <Form.Field name="lastName" {...stylex.props(styles.field)}>
          <Form.Label {...stylex.props(styles.label)}>Nom *</Form.Label>
          <form.Field name="lastName" validators={{ onChange: LastNameSchema }}>
            {(field) => {
              const error = field.state.meta.isTouched
                ? getErrorMessage(field.state.meta.errors)
                : undefined;
              return (
                <>
                  <Form.Control asChild>
                    <TextInput
                      placeholder="Votre nom"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      invalid={Boolean(error)}
                      disabled={loading}
                    />
                  </Form.Control>
                  {error && (
                    <Form.Message {...stylex.props(styles.message)}>
                      {error}
                    </Form.Message>
                  )}
                </>
              );
            }}
          </form.Field>
        </Form.Field>
        <Form.Field name="firstName" {...stylex.props(styles.field)}>
          <Form.Label {...stylex.props(styles.label)}>Prénom *</Form.Label>
          <form.Field
            name="firstName"
            validators={{ onChange: FirstNameSchema }}
          >
            {(field) => {
              const error = field.state.meta.isTouched
                ? getErrorMessage(field.state.meta.errors)
                : undefined;
              return (
                <>
                  <Form.Control asChild>
                    <TextInput
                      placeholder="Votre prénom"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      invalid={Boolean(error)}
                      disabled={loading}
                    />
                  </Form.Control>
                  {error && (
                    <Form.Message {...stylex.props(styles.message)}>
                      {error}
                    </Form.Message>
                  )}
                </>
              );
            }}
          </form.Field>
        </Form.Field>
      </div>
      <div {...stylex.props(styles.field)}>
        <label htmlFor={roleId} {...stylex.props(styles.label)}>
          Vous êtes *
        </label>
        <form.Field
          name="role"
          validators={{ onChange: SimpleLeadSchema.shape.role }}
        >
          {(field) => (
            <Select
              id={roleId}
              value={field.state.value}
              onValueChange={field.handleChange}
              onBlur={field.handleBlur}
              options={ROLE_OPTIONS}
              disabled={loading}
            />
          )}
        </form.Field>
      </div>
      <div {...stylex.props(styles.row)}>
        <Form.Field name="email" {...stylex.props(styles.field)}>
          <Form.Label {...stylex.props(styles.label)}>Email *</Form.Label>
          <form.Field
            name="email"
            validators={{ onChange: SimpleLeadSchema.shape.email }}
          >
            {(field) => {
              const error = field.state.meta.isTouched
                ? getErrorMessage(field.state.meta.errors)
                : undefined;
              return (
                <>
                  <Form.Control asChild>
                    <TextInput
                      type="email"
                      placeholder="exemple@email.com"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      invalid={Boolean(error)}
                      disabled={loading}
                    />
                  </Form.Control>
                  {error && (
                    <Form.Message {...stylex.props(styles.message)}>
                      {error}
                    </Form.Message>
                  )}
                </>
              );
            }}
          </form.Field>
        </Form.Field>

        <Form.Field name="phoneNumber" {...stylex.props(styles.field)}>
          <Form.Label {...stylex.props(styles.label)}>Téléphone *</Form.Label>
          <form.Field
            name="phoneNumber"
            validators={{ onChange: PhoneNumberSchema }}
          >
            {(field) => {
              const error = field.state.meta.isTouched
                ? getErrorMessage(field.state.meta.errors)
                : undefined;
              return (
                <>
                  <Form.Control asChild>
                    <PhoneInput
                      placeholder="06 XX XX XX XX"
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      invalid={Boolean(error)}
                      disabled={loading}
                    />
                  </Form.Control>
                  {error && (
                    <Form.Message {...stylex.props(styles.message)}>
                      {error}
                    </Form.Message>
                  )}
                </>
              );
            }}
          </form.Field>
        </Form.Field>
      </div>
      <div {...stylex.props(styles.field)}>
        <label htmlFor={gradeId} {...stylex.props(styles.label)}>
          Niveau académique *
        </label>
        <form.Field
          name="grade"
          validators={{ onChange: SimpleLeadSchema.shape.grade }}
        >
          {(field) => (
            <Select
              id={gradeId}
              value={field.state.value}
              onValueChange={field.handleChange}
              onBlur={field.handleBlur}
              options={GRADE_OPTIONS}
              disabled={loading}
            />
          )}
        </form.Field>
      </div>
      <div {...stylex.props(styles.field)}>
        <span id={attendanceLabelId} {...stylex.props(styles.label)}>
          Mode de cours *
        </span>
        <form.Field
          name="attendance"
          validators={{ onChange: SimpleLeadSchema.shape.attendance }}
        >
          {(field) => (
            <RadioCardGroup
              aria-labelledby={attendanceLabelId}
              value={field.state.value}
              onValueChange={field.handleChange}
              onBlur={field.handleBlur}
              options={ATTENDANCE_OPTIONS}
              disabled={loading}
            />
          )}
        </form.Field>
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      >
        {([canSubmit, isSubmitting]) => (
          <Form.Submit asChild>
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting || loading}
              {...stylex.props(styles.submit)}
            >
              {isSubmitting || loading
                ? "Envoi en cours..."
                : "Réserver mon cours d'essai gratuit"}
            </button>
          </Form.Submit>
        )}
      </form.Subscribe>
      {err && <p {...stylex.props(styles.errorMessage)}>{err}</p>}

      <p {...stylex.props(styles.submitTip)}>
        Nous vous contacterons sous 24h pour confirmer votre réservation.
      </p>
    </Form.Root>
  );
}

const styles = stylex.create({
  root: {
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: Color.ABSOLUTE_WHITE,
    border: `1px solid ${Color.ELEVATION_3}`,
    borderRadius: Radius.R24,
    padding: Spacing.S32,
    display: "flex",
    flexDirection: "column",
    gap: Spacing.S24,
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(2, 1fr)",
      "@media (max-width: 640px)": "1fr",
    },
    gap: Spacing.S24,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.S8,
    width: "100%",
  },
  label: {
    fontSize: "0.95rem",
    fontWeight: FontWeight.MEDIUM,
    color: Color.PRIMARY,
  },
  message: {
    fontSize: "0.85rem",
    color: "#d64545",
    margin: 0,
  },
  submit: {
    fontFamily: FontFamily.DEFAULT,
    fontSize: "1.125rem",
    fontWeight: FontWeight.SEMI_BOLD,
    color: Color.PRIMARY,
    backgroundColor: Color.ACCENT,
    borderStyle: "solid",
    borderColor: Color.ACCENT,
    borderWidth: "2px",
    borderRadius: Radius.R8,
    padding: `${Spacing.S16} ${Spacing.S32}`,
    width: "100%",
    transitionProperty: "opacity",
    transitionDuration: "150ms",

    opacity: {
      default: 1,
      "[disabled]": 0.6,
    },
    cursor: {
      default: "pointer",
      "[disabled]": "default",
    },
  },

  submitTip: {
    fontSize: "0.85rem",
    color: Color.PRIMARY_TERN,
    margin: 0,
    textAlign: "center",
  },

  errorMessage: {
    fontSize: "0.85rem",
    color: "#d64545",
    margin: 0,
    marginTop: -16,
  },
});
