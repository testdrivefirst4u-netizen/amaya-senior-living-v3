import { NextResponse, after } from "next/server";
import { getLeadsCollection } from "@/lib/mongodb";
import { isValidEmail, isValidPhone } from "@/lib/validation";
import { sendLeadNotification } from "@/lib/email";
import { pushLeadToCrm } from "@/lib/crmLead";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const residenceType = typeof body.residenceType === "string" ? body.residenceType.trim() : "";

  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Name, email and phone are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!isValidPhone(phone)) {
    return NextResponse.json(
      { error: "Enter a valid 10-digit phone number." },
      { status: 400 }
    );
  }
  const digits = phone.replace(/\D/g, "").slice(-10);

  after(() => {
    sendLeadNotification({
      name,
      email,
      phone: digits,
      preferredDate: "",
      source: "get-a-quote",
      residence: residenceType,
    }).catch((err) => {
      console.error("[get-quote] Failed to send lead notification email:", err);
    });
  });

  try {
    const leads = await getLeadsCollection();
    if (leads) {
      await leads.insertOne({
        name,
        email,
        phone: digits,
        residence: residenceType,
        source: "get-a-quote",
        siteSource: "website",
        createdAt: new Date(),
      });
    } else {
      console.warn(
        "[get-quote] MONGODB_URI not configured — lead was not persisted:",
        { name, email, phone: digits, residenceType }
      );
    }

    // The lead is already safely saved above — don't let a CRM hiccup fail
    // the submission, just make sure we've waited for the attempt before
    // responding (so the client only unlocks pricing once both have run).
    try {
      await pushLeadToCrm({
        name,
        email,
        phone: digits,
        source: "get-a-quote",
        message: `Interested residence: ${residenceType}`,
      });
    } catch (err) {
      console.error("[get-quote] Failed to push lead to CRM:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[get-quote] Failed to save lead:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
