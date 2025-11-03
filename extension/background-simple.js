// Minimal test service worker
console.log('[Test] Service worker started successfully!');

chrome.runtime.onInstalled.addListener(() => {
  console.log('[Test] Extension installed');
  chrome.action.setBadgeText({ text: 'OK' });
  chrome.action.setBadgeBackgroundColor({ color: '#00FF00' });
});
