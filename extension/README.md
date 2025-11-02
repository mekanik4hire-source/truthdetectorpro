# TruthDetectorPro - Scam Radar Extension

**Always-on background protection** against scams, phishing, and misinformation.

## 🛡️ Features

- **Always-On Monitoring**: Runs in background on ALL websites
- **Local-First Privacy**: All scanning happens on your device, no data sent to servers
- **Smart Detection**: Identifies common phishing phrases, suspicious URLs, and insecure forms
- **Visual Warnings**: Non-intrusive ribbon at top of page when risks detected
- **Daily Reports**: Track what you encountered and export as JSON
- **Badge Status**: Shows "ON" (green) when active, or risk count (orange) when threats found

## 🚀 Installation (Development)

### For Chrome/Edge:

1. Open `chrome://extensions` (or `edge://extensions`)
2. Toggle **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `/extension` folder from this repository
5. Pin the extension icon to your toolbar
6. Browse to any website and check the badge shows "ON"

### For Firefox:

1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `manifest.json` from the `/extension` folder

## 🧪 Testing

1. **Verify it's running**: Badge should show "ON" in green
2. **Test on phishing simulation**: Visit a test page with phrases like "verify your account" - should show warning ribbon
3. **Check popup**: Click extension icon to see stats
4. **View logs**: Open DevTools Console, you'll see `[TDP Background]` and `[TDP Content]` logs

## 📊 How It Works

### Background Service Worker (`background.js`)
- Runs continuously in the background
- Sets badge to "ON" when active
- Logs page navigations (URL + timestamp only, no content)
- Receives risk alerts from content scripts
- Stores detections in local storage

### Content Script (`content.js`)
- Injected into every webpage
- Scans for risk patterns:
  - Phishing phrases ("verify your account", "urgent action required")
  - Suspicious URLs (typosquatting, lookalike domains)
  - Password fields on non-HTTPS pages
- Shows dismissible warning ribbon when risks found
- All processing happens locally - no network requests

### Popup UI (`popup.html/js`)
- Shows scan stats (pages scanned, risks found)
- Recent activity list
- Export data as JSON
- Daily report viewer
- Clear history

## 🔒 Privacy

**Everything runs locally on your device.**

- No tracking, no analytics
- No data sent to external servers
- URL visited and risk patterns stored in `chrome.storage.local` only
- You can clear all history anytime from the popup

## 🛠️ Development

### File Structure
```
extension/
├── manifest.json       # Extension config (MV3)
├── background.js       # Service worker (always running)
├── content.js          # Injected into webpages
├── popup.html          # Extension popup UI
├── popup.js            # Popup logic
├── popup.css           # Popup styles
├── icons/              # Extension icons (16, 48, 128px)
└── README.md          # This file
```

### Adding New Risk Rules

Edit `RISK_PATTERNS` in `content.js`:

```javascript
const RISK_PATTERNS = {
  phishing: [
    /your pattern here/i,
  ],
  suspicious_urls: [
    /malicious-domain\.com/i,
  ]
};
```

### Future Enhancements

- [ ] Deep scan integration with PWA API
- [ ] Auto-block option (user-controlled)
- [ ] Recovery wizard for evidence compilation
- [ ] Pro tier with unlimited scans
- [ ] Community-contributed rule sets

## 📝 Version History

- **v0.1.0** - Initial MV3 skeleton with local risk detection

## 🔗 Related

- **PWA**: https://truthdetectorpro.onrender.com (on-demand fact checks)
- **Extension**: This folder (always-on background protection)

Use both for complete coverage:
- PWA for manual deep scans
- Extension for automatic background monitoring
