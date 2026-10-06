/**
 * Pushes a copy of every website lead to the broaddcast real-estate CRM, in
 * addition to our own MongoDB save (getLeadsCollection). Server-only —
 * BROADDCAST_CRM_API_KEY must never reach the client bundle.
 */

const CRM_ENDPOINT = "https://realestate-crm.broaddcast.com/api/inbound/leads";

const SOURCE_LABEL: Record<CrmLead["source"], string> = {
  "book-a-visit": "Book a Visit",
  "get-a-quote": "Get a Quote",
};

export type CrmLead = {
  name: string;
  email: string;
  phone: string;
  source: "book-a-visit" | "get-a-quote";
  message?: string;
};

export async function pushLeadToCrm(lead: CrmLead): Promise<void> {
  const apiKey = process.env.BROADDCAST_CRM_API_KEY;
  if (!apiKey) {
    console.warn("[crmLead] BROADDCAST_CRM_API_KEY not configured — skipping CRM sync.");
    return;
  }

  const sourceTag = `[${SOURCE_LABEL[lead.source]}]`;
  const message = lead.message ? `${sourceTag} ${lead.message}` : sourceTag;

  const res = await fetch(CRM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      name: lead.name,
      phone: `+91${lead.phone}`,
      email: lead.email,
      message,
      _gotcha: "", // honeypot — leave empty
    }),
  });

  const json = await res.json().catch(() => null);
  if (!res.ok || !json || json.status !== "success") {
    throw new Error(
      `CRM lead push failed (${res.status}): ${json?.message || "Unknown error"}`
    );
  }
}
