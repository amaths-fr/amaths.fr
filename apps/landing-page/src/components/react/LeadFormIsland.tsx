import { SimpleLeadForm } from "./SimpleLeadForm";
import { LeadApi, type SimpleLead } from "@amaths/sdk";
import * as React from "react";
import { sdk } from "../../lib/sdk.ts";
import {
  Color,
  FontFamily,
  FontWeight,
  Radius,
  Spacing,
} from "@amaths/ui/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { OpenAiEvents } from "../../lib/openai.ts";

// Submission handling (API call, persistence, navigation, analytics...) is
// intentionally out of scope here and left to be wired up separately.
export function LeadFormIsland() {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [err, setErr] = React.useState<string | undefined>(undefined);

  async function handleSubmit(lead: SimpleLead) {
    setLoading(true);
    setErr(undefined);
    try {
      await sdk.use(LeadApi.PlanTrial, lead);
      OpenAiEvents.emitFormSubmitted();
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      setErr("Erreur lors de l'envoi du formulaire, veuillez réessayer");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div {...stylex.props(styles.root)}>
        <h4>Formulaire envoyé</h4>
        <p {...stylex.props(styles.submitTip)}>
          Nous vous contacterons sous 24h pour confirmer votre réservation.
        </p>
        <button
          {...stylex.props(styles.again)}
          onClick={() => setSubmitted(false)}
        >
          Renvoyer une réponse
        </button>
      </div>
    );
  }

  return <SimpleLeadForm onSubmit={handleSubmit} loading={loading} err={err} />;
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
  submitTip: {
    color: Color.PRIMARY_TERN,
    margin: 0,
  },

  again: {
    fontFamily: FontFamily.DEFAULT,
    fontSize: "1.125rem",
    fontWeight: FontWeight.SEMI_BOLD,
    color: Color.WHITE,
    backgroundColor: Color.PRIMARY,
    borderStyle: "solid",
    borderColor: Color.PRIMARY,
    borderWidth: "2px",
    borderRadius: Radius.R8,
    padding: `${Spacing.S16} ${Spacing.S32}`,
    width: "100%",
    transitionProperty: "opacity",
    transitionDuration: "150ms",

    cursor: "pointer",
  },
});
