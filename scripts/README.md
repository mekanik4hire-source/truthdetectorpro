# Smoke Test Robot 🤖

Automatically checks your PWA deployment to catch broken things before adding new features.

## What It Checks

- ✅ `/healthz` endpoint returns "ok"
- ✅ Manifest is reachable
- ✅ Has 192px & 512px icons
- ✅ Has 1280x720 & 1080x1920 screenshots

## How to Run

### Test Local Development Server

```bash
node scripts/smoke.mjs http://localhost:5000
```

### Test Production (Render)

```bash
node scripts/smoke.mjs https://truthdetectorpro.onrender.com
```

## Add to package.json (Optional)

To run with `npm run smoke`, manually add this line to your `package.json` under `"scripts"`:

```json
"scripts": {
  "dev": "...",
  "build": "...",
  "smoke": "node scripts/smoke.mjs https://truthdetectorpro.onrender.com"
}
```

Then you can run:
```bash
npm run smoke
```

## Expected Output

When everything works:

```
✅ /healthz returns ok
✅ manifest reachable
✅ has 192 & 512 icons
✅ has 1280x720 & 1080x1920 screenshots

---
✅ All tests passed!
```

If something is broken:

```
✅ /healthz returns ok
❌ manifest reachable
---
❌ 1 tests failed
```

## Troubleshooting

**Production test times out:**
- Your Render site might be sleeping (first request takes 30-60 seconds)
- Try running the test again
- Or deploy your site first: `git push` to trigger Render deployment

**Icons or screenshots missing:**
- Check `client/public/manifest.webmanifest`
- Check `client/public/icons/` folder
- Check `client/public/screenshots/` folder

## Next Steps

Once all tests pass ✅, you're ready for Phase 2:
- Daily risk reports in extension
- Connect extension exports to Evidence Vault
