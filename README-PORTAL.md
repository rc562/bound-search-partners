# BSP Client Portal — Go-Live Runbook

The portal ships in this repo at /portal.html (deploys to boundsearch.com/portal).
It is NOT linked from the main site — clients reach it only via the URL you send them.
Until the steps below are done, only the PREVIEW demo code works.

## One-time setup (~20 min)

1. **Install the blobs dependency** (local terminal, repo root):
   npm install @netlify/blobs

2. **Define your engagements** — Netlify dashboard → Site → Environment variables →
   add `PORTAL_ENGAGEMENTS` with JSON like:
   {
     "AAK-7K2M9X": {
       "client": "Confidential — Food Ingredients",
       "contact": "Megan G.",
       "role": "Plant Manager — Flagship U.S. Site",
       "meta": "Retained Search · Initiated March 2026 · Led by Bob Cwenar",
       "stage": 2,
       "stages": [["Discovery","Week 1"],["Market Mapping","Weeks 2–3"],["Candidate Development","In progress"],["Finalist Slate","Upcoming"],["Offer & Onboarding","—"]],
       "thisWeek": "Update this weekly — a stale portal is worse than no portal.",
       "nextTouch": { "title": "Pipeline Review Call", "detail": "Thursday 2:00 PM ET · with Bob Cwenar" },
       "docs": [
         { "id": "aak-update-wk4.pdf", "title": "Search Update Report — Week 4", "desc": "Jun 6, 2026", "isNew": true }
       ]
     }
   }
   Codes: use random strings (client prefix + 6 chars). One code per engagement.

3. **Upload documents** (local terminal, repo root, after `netlify login` + `netlify link`):
   netlify blobs:set portal-docs aak-update-wk4.pdf --input ./path/to/report.pdf
   The blob key must exactly match the doc "id" in PORTAL_ENGAGEMENTS.

4. **Deploy** — normal git push. Portal lives at boundsearch.com/portal.

## Weekly operating drill (per active engagement, ~5 min)
- Upload the new report:  netlify blobs:set portal-docs <id> --input <file>
- Update PORTAL_ENGAGEMENTS: add the doc entry, refresh "thisWeek", bump "stage"/"nextTouch"
- Netlify env var changes apply on next deploy or function cold start

## Security model (honest version)
- Access-code auth, rate-limited (10 attempts / 10 min / IP). Appropriate for the
  same documents you already email; not for anything you wouldn't email.
- Codes + engagement data live ONLY in env vars; documents ONLY in Netlify Blobs.
  Nothing sensitive ever enters this public repo.
- Rotate a code by changing it in PORTAL_ENGAGEMENTS (e.g., when an engagement closes).
- portal.html carries noindex/nofollow.

## Later upgrades (when worth it)
- Admin upload page (replace CLI) protected by a master key
- Per-document signed URLs + expiry; audit log of client views
- portal.boundsearch.com subdomain (Netlify domain settings, cosmetic only)
