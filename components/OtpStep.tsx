"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import { createRecaptchaVerifier, isFirebaseConfigured, sendOtp } from "@/lib/firebaseClient";

const RESEND_COOLDOWN_SECONDS = 30;

/** Firebase's own error codes are specific and worth surfacing directly —
 * "check the number" is actively misleading for e.g. a region/quota issue
 * that has nothing to do with what the visitor typed. */
function firebaseSendErrorMessage(err: unknown): string {
  const code = err && typeof err === "object" && "code" in err ? String((err as { code: unknown }).code) : "";
  switch (code) {
    case "auth/invalid-phone-number":
      return "That doesn't look like a valid phone number. Please check and try again.";
    case "auth/operation-not-allowed":
      return "SMS verification isn't available for this number right now. Please try again shortly.";
    case "auth/too-many-requests":
    case "auth/quota-exceeded":
      return "Too many attempts. Please wait a bit before requesting another code.";
    case "auth/captcha-check-failed":
      return "Verification check failed. Please refresh the page and try again.";
    default:
      return "Couldn't send the OTP. Please try again.";
  }
}

/**
 * Shared "verify this phone number" step, dropped into any lead form after
 * its own fields are filled in. Sends a Firebase Phone Auth OTP, lets the
 * user enter the code, and calls `onVerified` with the resulting Firebase
 * ID token once confirmed — callers send that token to their own API route
 * so the server can independently verify it before saving anything.
 */
export default function OtpStep({
  phone,
  onVerified,
  onBack,
}: {
  /** Raw 10-digit Indian mobile number (already validated by the caller). */
  phone: string;
  onVerified: (idToken: string) => void;
  onBack: () => void;
}) {
  const recaptchaContainerId = `otp-recaptcha-${useId().replace(/:/g, "")}`;
  const verifierRef = useRef<RecaptchaVerifier | null>(null);
  const confirmationRef = useRef<ConfirmationResult | null>(null);

  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"sending" | "sent" | "verifying" | "error">("sending");
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const configured = isFirebaseConfigured();

  const sendCode = async () => {
    setError(null);
    setStatus("sending");
    try {
      if (!verifierRef.current) {
        verifierRef.current = createRecaptchaVerifier(recaptchaContainerId);
      }
      confirmationRef.current = await sendOtp(`+91${phone}`, verifierRef.current);
      setStatus("sent");
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      console.error("[OtpStep] Failed to send OTP:", err);
      // Firebase invalidates the reCAPTCHA widget once a send attempt fails
      // (or errors internally, as it does for auth/operation-not-allowed) —
      // reusing verifierRef here throws "reCAPTCHA client element has been
      // removed" on the very next attempt. Drop it so the next click/retry
      // renders a fresh widget instead of reusing the dead one.
      try {
        verifierRef.current?.clear();
      } catch {
        // Already gone — nothing to clean up.
      }
      verifierRef.current = null;
      setError(firebaseSendErrorMessage(err));
      setStatus("error");
    }
  };

  useEffect(() => {
    if (configured) sendCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationRef.current || code.length !== 6) return;
    setError(null);
    setStatus("verifying");
    try {
      const result = await confirmationRef.current.confirm(code);
      const idToken = await result.user.getIdToken();
      onVerified(idToken);
    } catch (err) {
      console.error("[OtpStep] Failed to verify OTP:", err);
      setError("That code didn't match. Please check and try again.");
      setStatus("sent");
    }
  };

  if (!configured) {
    return (
      <div className="otp-step">
        <p className="bv-error">
          Phone verification isn&rsquo;t configured yet. Please try again later.
        </p>
        <button type="button" className="btn-text" onClick={onBack}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="otp-step">
      <div id={recaptchaContainerId} />

      <p className="otp-sub">
        {status === "sending"
          ? `Sending a code to +91 ${phone}…`
          : <>Enter the 6-digit code sent to <strong>+91 {phone}</strong>.</>}
      </p>

      <form onSubmit={handleVerify} className="bv-form">
        <label className="bv-field">
          <span>OTP Code</span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="6-digit code"
            disabled={status === "sending"}
            autoFocus
          />
        </label>

        {error && <p className="bv-error">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary bv-submit"
          disabled={status === "sending" || status === "verifying" || code.length !== 6}
        >
          {status === "verifying" ? "Verifying…" : "Verify Code"}
        </button>
      </form>

      <div className="otp-actions">
        <button type="button" className="btn-text" onClick={onBack}>
          Change number
        </button>
        <button
          type="button"
          className="btn-text"
          onClick={sendCode}
          disabled={cooldown > 0 || status === "sending"}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
        </button>
      </div>
    </div>
  );
}
