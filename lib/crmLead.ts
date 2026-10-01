/**
 * Pushes a copy of every website lead to the broaddcast sales CRM, in
 * addition to our own MongoDB save (getLeadsCollection). Server-only —
 * BROADDCAST_CRM_API_KEY must never reach the client bundle.
 */

const CRM_ENDPOINT = "https://sales.broaddcast.com/api/public/leads";

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

  const res = await fetch(CRM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      phone: `+91${lead.phone}`,
      source: lead.source,
      message: lead.message,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`CRM lead push failed (${res.status}): ${body}`);
  }
}
