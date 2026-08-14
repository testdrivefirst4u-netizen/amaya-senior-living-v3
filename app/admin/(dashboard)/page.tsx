import type { Metadata } from "next";
import { getLeadsCollection } from "@/lib/mongodb";
import LeadsTable, { type LeadRow } from "@/components/admin/LeadsTable";

export const metadata: Metadata = {
  title: "Dashboard · Amaya Admin",
  robots: { index: false, follow: false },
};

// Auth-gated and always reads live data — never statically prerender.
export const dynamic = "force-dynamic";

async function fetchLeads(): Promise<{ leads: LeadRow[]; dbError: boolean }> {
  try {
    const leads = await getLeadsCollection();
    if (!leads) return { leads: [], dbError: false };

    const docs = await leads.find({}).sort({ createdAt: -1 }).toArray();
    return {
      dbError: false,
      leads: docs.map((doc) => ({
        id: String(doc._id),
        name: typeof doc.name === "string" ? doc.name : "",
        email: typeof doc.email === "string" ? doc.email : "",
        phone: typeof doc.phone === "string" ? doc.phone : "",
        preferredDate: typeof doc.preferredDate === "string" ? doc.preferredDate : "",
        createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt ?? ""),
      })),
    };
  } catch (err) {
    console.error("[admin] Failed to load leads:", err);
    return { leads: [], dbError: true };
  }
}

export default async function AdminDashboardPage() {
  const { leads, dbError } = await fetchLeads();

  return (
    <div>
      <div className="admin-topbar">
        <h1>Book a Visit</h1>
        <p>Leads submitted through the site&rsquo;s visit-request form.</p>
      </div>
      {dbError ? (
        <div className="admin-table-wrap">
          <p className="admin-empty">
            Couldn&rsquo;t connect to the database. Check that MONGODB_URI is
            correct and that this server&rsquo;s IP is allowed in Atlas
            Network Access, then reload.
          </p>
        </div>
      ) : (
        <LeadsTable leads={leads} />
      )}
    </div>
  );
}
