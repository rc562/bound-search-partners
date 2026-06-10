// Validates an engagement access code and returns the engagement manifest.
// Engagements live in the PORTAL_ENGAGEMENTS env var (JSON) — never in the repo.
// Format: { "CODE123": { client, contact, role, meta, stage, stages, thisWeek, nextTouch, docs } }

const attempts = new Map(); // ip -> [timestamps]
const LIMIT = 10, WINDOW = 10 * 60 * 1000;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  const ip = event.headers["x-nf-client-connection-ip"] || event.headers["client-ip"] || "unknown";
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter(t => now - t < WINDOW);
  if (recent.length >= LIMIT) return { statusCode: 429, body: "Too many attempts" };
  recent.push(now);
  attempts.set(ip, recent);

  let code;
  try { code = (JSON.parse(event.body || "{}").code || "").trim(); } catch { return { statusCode: 400, body: "Bad request" }; }
  if (!code || code.length > 64) return { statusCode: 400, body: "Bad request" };

  let engagements;
  try { engagements = JSON.parse(process.env.PORTAL_ENGAGEMENTS || "{}"); } catch { return { statusCode: 500, body: "Portal not configured" }; }

  const eng = engagements[code];
  if (!eng) return { statusCode: 401, body: "Invalid code" };

  // Strip anything not meant for the client before returning
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    body: JSON.stringify({ engagement: eng }),
  };
};
