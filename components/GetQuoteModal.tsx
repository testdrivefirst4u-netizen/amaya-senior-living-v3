"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconPlus } from "./Icons";
import { isValidEmail, isValidPhone, normalizePhoneInput } from "@/lib/validation";
import { OTP_ENABLED } from "@/lib/otpConfig";
import OtpStep from "./OtpStep";

type Step = "details" | "otp";

export default function GetQuoteModal({
  isOpen,
  residenceType,
  onClose,
  onUnlocked,
}: {
  isOpen: boolean;
  residenceType: string;
  onClose: () => void;
  onUnlocked: () => void;
}) {
  const [step, setStep] = useState<Step>("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setStep("details");
      setName("");
      setEmail("");
      setPhone("");
      setError(null);
      setSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!isValidPhone(phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    if (!OTP_ENABLED) {
      handleVerified("");
      return;
    }
    setStep("otp");
  };

  const handleVerified = async (idToken: string) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/get-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, residenceType, idToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        setStep("details");
        return;
      }
      onUnlocked();
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
      setStep("details");
    }
  };

  return createPortal(
    <div
      className="bv-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Get a Quote"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bv-modal">
        <button className="bv-close" aria-label="Close" onClick={onClose}>
          <IconPlus size={18} />
        </button>

        <h3 className="bv-title">Get a Quote</h3>

        {step === "details" ? (
          <>
            <p className="bv-sub">
              Verify your number to see pricing for the {residenceType} residence,
              and every other layout too.
            </p>

            <form className="bv-form" onSubmit={handleContinue}>
              <label className="bv-field">
                <span>Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
              </label>

              <label className="bv-field">
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label className="bv-field">
                <span>Phone Number</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(normalizePhoneInput(e.target.value))}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  required
                />
              </label>

              {error && <p className="bv-error">{error}</p>}

              <button className="btn btn-primary bv-submit" type="submit" disabled={submitting}>
                {submitting ? "Saving…" : "Continue"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="bv-sub">
              We verify your number before showing pricing, so our team can
              always reach you.
            </p>
            <OtpStep phone={phone} onVerified={handleVerified} onBack={() => setStep("details")} />
            {submitting && <p className="otp-sub">Unlocking pricing…</p>}
            {error && <p className="bv-error">{error}</p>}
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
