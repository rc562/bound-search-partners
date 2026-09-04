const rateLimitMap = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.windowStart > RATE_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  record.count++;
  return record.count > RATE_LIMIT;
}

const SYSTEM = `You are the Bound Search Partners assistant on boundsearch.com. Bound Search Partners (BSP) is a retained executive search firm founded in 2024 by Bob Cwenar, serving U.S. manufacturers nationwide. Do not state or speculate about the firm's office location or address. Facts: 200+ executive placements; 92% retained beyond year one; proprietary shortlist within 30 days; typical search ~120 days; guarantee-backed engagements with 90-day onboarding support; a live client portal. Services: Executive Search (CEO, COO, CFO, VP Operations, VP Supply Chain); Operations & Plant Leadership (Plant Manager, Director Engineering, Quality Director); Organizational Advisory (leadership audit, succession, org design, comp benchmarking); Strategic Advisory & Intelligence (business model audit, roadmaps, market entry, portfolio diagnostics). Industries: manufacturing, supply chain & logistics, building products, food & beverage, chemicals & packaging, private equity, industrial equipment, real estate, engineering services. Bob built and led GattiHR's first Industrial Practice and directed engagements at Kingsley Gate Partners. Contact: bob@boundsearch.com, (267) 265-1792. Publications: the Advisory No. series (latest No. 05, "Governing Without a Rulebook").
Voice: warm, assured, and knowledgeable — the tone of an experienced senior consultant who is glad to help, never curt or salesy. Use complete, natural sentences rather than clipped fragments. No exclamation marks, no hype, no emoji. Speak as "we". Answer in 2–4 sentences unless asked for detail. If asked about fees or a specific search, say those begin with a conversation with Bob and offer the contact details. Never invent client names or placements. If a question is outside BSP's scope, say so briefly and redirect.`;

export const handler = async (event) => {
  const origin = event.headers.origin || "";
  const allowed = ["https://boundsearch.com", "https://www.boundsearch.com"];
  const corsOrigin = allowed.includes(origin) ? origin : allowed[0];
  const headers = { "Access-Control-Allow-Origin": corsOrigin, "Access-Control-Allow-Headers": "Content-Type", "Content-Type": "application/json" };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: "Method not allowed" };
  const clientIP = event.headers["x-forwarded-for"] || event.headers["client-ip"] || "unknown";
  if (isRateLimited(clientIP)) return { statusCode: 429, headers, body: JSON.stringify({ error: "Too many requests." }) };
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) return { statusCode: 500, headers, body: JSON.stringify({ error: "API key not configured" }) };
  try {
    const { messages } = JSON.parse(event.body);
    const trimmedMessages = messages.slice(-10);
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 400, system: SYSTEM, messages: trimmedMessages }),
    });
    const data = await response.json();
    if (!response.ok) console.error("anthropic error", response.status, JSON.stringify(data));
    return { statusCode: response.ok ? 200 : 502, headers, body: JSON.stringify(data) };
  } catch (error) {
    console.error("chat function error", error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Failed to connect to AI service" }) };
  }
};
