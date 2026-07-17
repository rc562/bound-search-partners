# Task: Mature the "Beyond the work" copy on boundsearch.com

## Repo
`rc562/bound-search-partners` → `src/App.jsx`

Each description string below appears **twice** in App.jsx (the interactive word
list ~line 902 and a mobile/plain list ~line 921). Replace **every occurrence**.
Labels (`w:` values) stay the same; only the `d:` description text changes.

### 1. Philadelphia
FIND:
`Rooted, not relocated. The skyline on this site is the view from home.`
REPLACE:
`Rooted here by choice. The skyline on this site is the view from home; the industrial economy around it is the one this firm serves.`

### 2. Son of a builder
FIND:
`Bob's father builds custom homes and restores historic properties in Bucks County. An appreciation for people who make physical things runs in the family.`
REPLACE:
`Bob's father builds custom homes and restores historic properties in Bucks County. The regard for people who make physical things — and stand behind the finished work — is inherited.`

### 3. Behind the lens
FIND:
`Usually within reach of a camera. City frames and landscapes, mostly — patience training disguised as a hobby.`
REPLACE:
`A longtime photographer of cities and landscapes. The discipline transfers: wait for the right frame, not the available one.`

### 4. The kitchen
FIND:
`Cooking is the other discipline practiced here: preparation, timing, execution, no hand-offs.`
REPLACE:
`Where the same standards apply — preparation, timing, execution. Bob cooks the way he runs searches: personally, start to finish.`

### 5. Markets & macro
FIND:
`A standing fascination with geopolitics, supply chains, and what moves them — which is how the advisories on this site got started.`
REPLACE:
`A standing study of geopolitics, capital flows, and supply chains — the research habit behind the client advisories published on this site.`

## Optional: new headshot
Replace `public/headshot.jpg` with the enhanced headshot from the design system
(`assets/images/headshot.jpg` in the design project — contrast +7%, saturation +9%).

## Verify
- `grep -c "patience training" src/App.jsx` → 0
- `npm run build` passes
- Commit: `Mature Beyond-the-work founder copy` → push to main (Netlify deploys)

## Reminder
The earlier task (remove the No. 04 advisory toast) is still unpushed — `advToast`
is live on main. See `remove-advisory-toast.md`.
