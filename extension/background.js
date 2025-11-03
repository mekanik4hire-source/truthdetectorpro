// background.js

function setBadge(text = "ON") {
  chrome.action.setBadgeText({ text });
  chrome.action.setBadgeBackgroundColor({ color: "#16a34a" }); // green
}

console.log("[Background] Starting service worker...");

chrome.runtime.onInstalled.addListener(() => {
  console.log("[Background] Extension installed/updated");
  setBadge();
});

chrome.runtime.onStartup.addListener(() => {
  console.log("[Background] Extension startup");
  setBadge();
});

// Count detections by day (for popup)
async function incrementDetectionCount() {
  const today = new Date().toISOString().slice(0, 10);
  const { detections = {} } = await chrome.storage.local.get(["detections"]);
  detections[today] = (detections[today] || 0) + 1;
  await chrome.storage.local.set({ detections });
  const n = detections[today];
  setBadge(n > 0 ? String(Math.min(n, 99)) : "ON");
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === "RADAR_DETECTION") {
    incrementDetectionCount();
    sendResponse({ ok: true });
    return true;
  }
  if (msg?.type === "RADAR_LOG") {
    sendResponse({ ok: true });
    return true;
  }
});

console.log("[Background] Service worker initialized successfully");
