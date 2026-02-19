# Bound Search Partners Website

## Quick Start (Local Development)
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

### Option A: Manual Build + Deploy
```bash
npm install
npm run build
```
This creates a `dist/` folder. Push the contents of `dist/` to your GitHub repo, or set GitHub Pages to serve from the `dist` folder.

### Option B: GitHub Actions (Recommended — Auto-deploys on push)
1. Push this entire project to your GitHub repo
2. Go to Settings → Pages → Source → Select "GitHub Actions"
3. Create file `.github/workflows/deploy.yml` with the content below
4. Every push to `main` will auto-build and deploy

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

## Adding Videos
1. Place your two .mp4 files in the `public/` folder (e.g., `public/video1.mp4` and `public/video2.mp4`)
2. In `src/App.jsx`, find the hero section comment about VIDEO PLACEHOLDER
3. Replace the gradient placeholder div with:
```jsx
<video id="vid1" autoPlay muted loop playsInline style={{position:"absolute",inset:0,objectFit:"cover",width:"100%",height:"100%",zIndex:0}}>
  <source src="./video1.mp4" type="video/mp4" />
</video>
<video id="vid2" autoPlay muted loop playsInline style={{position:"absolute",inset:0,objectFit:"cover",width:"100%",height:"100%",zIndex:0,opacity:0,transition:"opacity 1.5s ease"}}>
  <source src="./video2.mp4" type="video/mp4" />
</video>
```
4. Add this crossfade script inside a `useEffect` in the App component:
```js
useEffect(() => {
  const v1 = document.getElementById('vid1');
  const v2 = document.getElementById('vid2');
  if (!v1 || !v2) return;
  let show1 = true;
  const interval = setInterval(() => {
    show1 = !show1;
    v1.style.opacity = show1 ? '1' : '0';
    v2.style.opacity = show1 ? '0' : '1';
  }, 10000);
  return () => clearInterval(interval);
}, [loaded]);
```

## Custom Domain (boundsearch.com)
1. In GitHub repo Settings → Pages → Custom domain → enter `www.boundsearch.com`
2. At your domain registrar, add a CNAME record: `www` → `yourusername.github.io`
3. GitHub auto-provisions SSL
