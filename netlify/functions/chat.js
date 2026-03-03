// Simple in-memory rate limiter (resets on function cold start)
const rateLimitMap = new Map();
const RATE_LIMIT = 20; // max requests per IP per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.windowStart > RATE_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }
  record.count++;
  if (record.count > RATE_LIMIT) return true;
  return false;
}

exports.handler = async (event) => {
  const ALLOWED_ORIGIN = process.env.SITE_URL || "https://boundsearch.com";

  const headers = {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: "Method not allowed" };
  }

  // Rate limiting
  const clientIP = event.headers["x-forwarded-for"] || event.headers["client-ip"] || "unknown";
  if (isRateLimited(clientIP)) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: "Too many requests. Please try again later." }),
    };
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "API key not configured" }) };
  }

  try {
    const { messages } = JSON.parse(event.body);

    // Limit conversation length to prevent token abuse
    const trimmedMessages = messages.slice(-10);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: `You are the AI assistant for Bound Search Partners, a retained executive search firm based in Philadelphia, founded by Bob Cwenar. You specialize in manufacturing, industrial, and supply chain leadership placements (VP to C-Suite).

Key facts about the firm:
- Retained search model only (not contingent)
- Personally led by founder Bob Cwenar -- over a decade of experience
- Serves manufacturing, supply chain, building products, food and beverage, chemicals, packaging, private equity portfolio companies, industrial equipment, real estate development, and engineering services
- Services: Executive Search, Operations and Plant Leadership, Organizational Advisory, Strategic Advisory
- 200+ executive placements, 92% year-one retention rate, 50+ client organizations
- Uses research-driven sourcing combined with personal human vetting of every candidate
- Phone: (267) 265-1792 | Email: bob@boundsearch.com | Website: boundsearch.com
- Based in Philadelphia, serving manufacturers nationwide

Your role:
- Answer questions about Bound Search Partners services, process, and approach
- Help visitors think through their hiring needs -- what kind of leader they need, what to look for, timeline expectations
- Be warm, direct, and knowledgeable -- match Bob tone: confident but not arrogant
- If someone seems ready to engage, encourage them to fill out the contact form or call Bob directly
- Keep responses concise (2-4 sentences usually) -- this is a chat widget, not an essay
- Never make up specific client names, case studies, or placement details
- If asked about pricing, say retained search fees are discussed during the initial consultation and are tailored to each engagement`,
        messages: trimmedMessages,
      }),
    });

    const data = await response.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Failed to connect to AI service" }) };
  }
};
