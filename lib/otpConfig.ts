// Single switch for the "verify phone via Firebase OTP before saving a
// lead" requirement across Book a Visit and Get a Quote. Temporarily set
// NEXT_PUBLIC_OTP_ENABLED=false (client and server both read it — it's
// used here on the server too, not just inlined into client bundles) to
// skip OTP while Firebase Phone Auth is being sorted out; flip it back to
// "true" (or remove it) to re-enable verification everywhere at once.
export const OTP_ENABLED = process.env.NEXT_PUBLIC_OTP_ENABLED !== "false";
