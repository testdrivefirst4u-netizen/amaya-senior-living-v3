import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

declare global {
  // eslint-disable-next-line no-var
  var _firebaseAdminApp: App | undefined;
}

function isConfigured(): boolean {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
}

function getAdminApp(): App {
  if (global._firebaseAdminApp) return global._firebaseAdminApp;
  if (getApps().length) {
    global._firebaseAdminApp = getApps()[0];
    return global._firebaseAdminApp;
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string;
  const serviceAccount = JSON.parse(raw);
  global._firebaseAdminApp = initializeApp({ credential: cert(serviceAccount) });
  return global._firebaseAdminApp;
}

/**
 * Verifies a Firebase ID token issued after a successful OTP sign-in and
 * returns the phone number Firebase itself confirmed — never trust a
 * phone number the client just sends in plain JSON, since that's exactly
 * what OTP verification exists to prevent someone from faking.
 */
export async function verifyPhoneIdToken(
  idToken: string
): Promise<{ uid: string; phoneNumber: string } | null> {
  if (!isConfigured()) {
    console.error("[firebaseAdmin] FIREBASE_SERVICE_ACCOUNT_KEY not configured.");
    return null;
  }
  try {
    const decoded = await getAuth(getAdminApp()).verifyIdToken(idToken);
    if (!decoded.phone_number) return null;
    return { uid: decoded.uid, phoneNumber: decoded.phone_number };
  } catch (err) {
    console.error("[firebaseAdmin] Failed to verify ID token:", err);
    return null;
  }
}
