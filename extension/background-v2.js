// Scam Radar - Background Service Worker (v2 - simplified)
console.log('[Background] Starting service worker...');

// Initialize badge when extension is installed or updated
chrome.runtime.onInstalled.addListener(function() {
  console.log('[Background] Extension installed/updated');
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.action.setBadgeBackgroundColor({ color: '#2AD17B' });
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log('[Background] Message received:', message.type);
  
  if (message.type === 'RISK_DETECTED') {
    const tabId = sender.tab ? sender.tab.id : null;
    if (tabId) {
      chrome.action.setBadgeText({ text: String(message.count), tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#FFB020', tabId: tabId });
    }
    
    // Store detection
    chrome.storage.local.get(['detections'], function(result) {
      const detections = result.detections || [];
      detections.push({
        timestamp: Date.now(),
        url: sender.tab ? sender.tab.url : null,
        title: sender.tab ? sender.tab.title : null,
        risks: message.risks
      });
      chrome.storage.local.set({ detections: detections });
    });
    
  } else if (message.type === 'NO_RISKS') {
    const tabId = sender.tab ? sender.tab.id : null;
    if (tabId) {
      chrome.action.setBadgeText({ text: 'ON', tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#2AD17B', tabId: tabId });
    }
  }
  
  sendResponse({ received: true });
  return true;
});

// Log page navigation
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url) {
    chrome.storage.local.get(['navigationLog'], function(result) {
      const log = result.navigationLog || [];
      log.push({
        timestamp: Date.now(),
        url: tab.url,
        title: tab.title || 'Untitled'
      });
      
      const trimmed = log.slice(-100);
      chrome.storage.local.set({ navigationLog: trimmed });
    });
  }
});

console.log('[Background] Service worker initialized successfully');
