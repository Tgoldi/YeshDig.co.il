// Sends a lead from the public contact forms to the site's own lead relay.
// Used when VITE_LEAD_ENDPOINT is set at build time (for example "/api/lead",
// served by server.js). The relay keeps the fixdigital IDs on the server,
// rate-limits, and the visitor's details travel in a POST body, not in a URL.
// When VITE_LEAD_ENDPOINT is not set, the forms keep their old direct call.

import { HONEYPOT_FIELD } from "@/lib/lead-guard";

export interface LeadFields {
  name: string;
  email: string;
  phone: string;
  message: string;
  plan?: string;
  // Cloudflare Turnstile token, checked by the relay when TURNSTILE_SECRET_KEY is set
  captchaToken?: string;
  // Value of the hidden honeypot field (empty for people)
  honeypot?: string;
}

if (!import.meta.env.VITE_LEAD_ENDPOINT) {
  console.warn(
    "VITE_LEAD_ENDPOINT is not set: contact forms call the fixdigital lead API directly from the browser. Set VITE_LEAD_ENDPOINT=/api/lead to send leads through the server relay."
  );
}

export async function postLead(endpoint: string, data: LeadFields): Promise<void> {
  const { honeypot, ...fields } = data;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...fields,
      [HONEYPOT_FIELD]: honeypot ?? "",
      formUrl: window.location.href,
      urlRefer: document.referrer,
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
}
