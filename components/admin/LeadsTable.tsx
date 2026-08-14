"use client";

import { useMemo, useState } from "react";

export type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  createdAt: string;
};

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateTime(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function downloadCsv(rows: LeadRow[]) {
  const header = ["S.No", "Name", "Email", "Phone", "Preferred Visit Date", "Submitted On"];
  const lines = [header.join(",")];
  rows.forEach((r, i) => {
    lines.push(
      [
        String(i + 1),
        csvEscape(r.name),
        csvEscape(r.email),
        csvEscape(r.phone),
        csvEscape(formatDate(r.preferredDate)),
        csvEscape(formatDateTime(r.createdAt)),
      ].join(",")
    );
  });
  const blob = new Blob(["﻿" + lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `amaya-book-a-visit-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((l) => {
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q);
      const matchesFrom = !fromDate || l.preferredDate >= fromDate;
      const matchesTo = !toDate || l.preferredDate <= toDate;
      return matchesSearch && matchesFrom && matchesTo;
    });
  }, [leads, search, fromDate, toDate]);

  return (
    <div>
      <div className="admin-filters">
        <label className="admin-filter-field admin-filter-search">
          <span>Search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, email or phone"
          />
        </label>
        <label className="admin-filter-field">
          <span>Visit From</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label className="admin-filter-field">
          <span>Visit To</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>
        <div className="admin-filters-spacer" />
        <button
          className="admin-export-btn"
          type="button"
          onClick={() => downloadCsv(filtered)}
          disabled={filtered.length === 0}
        >
          Export to Excel
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-table-wrap">
          <p className="admin-empty">
            {leads.length === 0
              ? "No visit requests yet."
              : "No leads match these filters."}
          </p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Preferred Visit Date</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead, i) => (
                <tr key={lead.id}>
                  <td className="admin-col-sno">{i + 1}</td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{formatDate(lead.preferredDate)}</td>
                  <td>{formatDateTime(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="admin-count">
        Showing {filtered.length} of {leads.length} lead{leads.length === 1 ? "" : "s"}
      </p>
    </div>
  );
}
