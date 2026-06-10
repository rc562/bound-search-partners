// Streams a document from Netlify Blobs to an authenticated client.
// Docs are uploaded by Bob via CLI: netlify blobs:set portal-docs <docId> --input file.pdf
// The doc must be listed in the engagement's docs[] for the presented code.

const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const code = (event.headers["x-portal-code"] || "").trim();
  const docId = (event.queryStringParameters || {}).doc || "";
  if (!code || !docId) return { statusCode: 400, body: "Bad request" };

  let engagements;
  try { engagements = JSON.parse(process.env.PORTAL_ENGAGEMENTS || "{}"); } catch { return { statusCode: 500, body: "Portal not configured" }; }

  const eng = engagements[code];
  if (!eng) return { statusCode: 401, body: "Invalid code" };
  if (!(eng.docs || []).some(d => d.id === docId)) return { statusCode: 403, body: "Not authorized for this document" };

  const store = getStore("portal-docs");
  const blob = await store.get(docId, { type: "arrayBuffer" });
  if (!blob) return { statusCode: 404, body: "Document not found" };

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${docId.replace(/[^\w.\-]/g, "_")}"`,
      "Cache-Control": "no-store",
    },
    body: Buffer.from(blob).toString("base64"),
    isBase64Encoded: true,
  };
};
