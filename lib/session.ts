// Signed admin session cookie. Uses Web Crypto only so it also runs
// in proxy.ts. Format: `<expiresAtMs>.<base64url HMAC-SHA256>`.

export const SESSION_COOKIE = "so_admin";
export const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const encoder = new TextEncoder();

function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;

  if (!value || value.length < 32) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be at least 32 characters"
    );
  }

  return value;
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload)
  );

  return Buffer.from(signature).toString("base64url");
}

export async function createSessionToken() {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  return `${expiresAt}.${await sign(String(expiresAt))}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false;

  const [expiresAt, signature] = token.split(".");

  if (!expiresAt || !signature || Number(expiresAt) < Date.now()) {
    return false;
  }

  try {
    const expected = await sign(expiresAt);

    if (expected.length !== signature.length) return false;

    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
      diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
    }

    return diff === 0;
  } catch {
    return false;
  }
}
