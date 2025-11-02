# Icon Placeholders

Chrome requires these icon files:
- `icon16.png` - 16x16px
- `icon48.png` - 48x48px  
- `icon128.png` - 128x128px

**For development**, you can use any PNG images of these sizes. The extension will still load without them (Chrome shows a default icon).

**To create proper icons:**
1. Use the shield with checkmark logo from the PWA (`client/public/icons/icon-512.png`)
2. Resize to 16px, 48px, and 128px
3. Save as PNG files in this folder

**Quick fix for testing:**
```bash
# Copy PWA icon as temporary placeholder
cp client/public/icons/icon-192.png extension/icons/icon128.png
# Resize using imagemagick or online tool for 16px and 48px versions
```
