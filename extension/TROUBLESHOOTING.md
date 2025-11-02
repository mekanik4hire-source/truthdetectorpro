# 🔧 Scam Radar Extension Troubleshooting

## Badge Not Showing

### Step 1: Check Extension is Loaded
1. Go to `chrome://extensions`
2. Find "TruthDetectorPro - Scam Radar"
3. Make sure the toggle switch is **ON** (blue)
4. If you see errors, try removing and re-adding the extension

### Step 2: Check Service Worker Status
1. On `chrome://extensions`, find the extension
2. Look for "service worker" (blue link) - click it
3. DevTools will open showing background script console
4. **You should see:**
   ```
   [TDP Background] Service worker started
   [TDP Background] Badge text set to ON
   [TDP Background] Badge color set to green
   ```
5. **If you see errors**, screenshot them and check below

### Step 3: Reload the Extension
1. Click the ⟳ (reload) icon on the extension card
2. Wait 2-3 seconds
3. Open a new tab and navigate to any website
4. Check if badge appears now

### Step 4: Test with Test Page
1. Open `extension/test.html` in Chrome (drag & drop into browser)
2. Open DevTools (F12) → Console tab
3. Look for `[TDP Content]` messages
4. Badge should show "ON" in green

## Common Issues

### "Service worker (Inactive)"
**Fix:** Click the "service worker" link to wake it up, then reload the extension.

### No Console Messages
**Fix:** The content script might not be injecting. Check:
- Extension has `<all_urls>` permission
- You've granted permission when prompted
- Try visiting a normal website (not chrome:// pages)

### Badge Shows But Wrong Color
**Fix:** The badge text might be too long. Check DevTools console for errors.

### "Cannot read property 'setBadgeText'"
**Fix:** This means the extension API isn't loaded. Reload the extension.

## Still Not Working?

### Manual Badge Test
1. Go to `chrome://extensions`
2. Click "service worker" link for the extension
3. In the DevTools console that opens, paste:
   ```javascript
   chrome.action.setBadgeText({ text: 'ON' });
   chrome.action.setBadgeBackgroundColor({ color: '#2AD17B' });
   ```
4. Press Enter
5. Check if badge appears now

If this works, the extension is fine but the automatic initialization might be failing.

### Check Chrome Version
- MV3 extensions require Chrome 88+
- Check: Menu → Help → About Google Chrome
- Update Chrome if needed

### File Permissions
Make sure all extension files are readable:
```bash
ls -la extension/
# All files should be -rw-r--r-- or similar
```

## Getting Help

If none of these steps work, provide:
1. Chrome version (`chrome://version`)
2. Screenshot of extension card at `chrome://extensions`
3. Service worker console logs (screenshot)
4. Page console logs when visiting test.html
