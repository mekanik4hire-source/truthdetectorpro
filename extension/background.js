// TruthDetectorPro - Scam Radar Background Service Worker
// Runs continuously to monitor browsing and set badge status

console.log('[TDP Background] Service worker started');

// Set badge to show extension is active
chrome.runtime.onInstalled.addListener(() => {
  console.log('[TDP Background] Extension installed/updated');
  setBadgeActive();
});

// Update badge when extension starts
setBadgeActive();

function setBadgeActive() {
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.action.setBadgeBackgroundColor({ color: '#2AD17B' }); // Safe green
  console.log('[TDP Background] Badge set to ON');
}

// Listen for tab updates to log navigation
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('[TDP Background] Page loaded:', tab.url);
    
    // Store basic navigation event (privacy-first: no content)
    const event = {
      timestamp: Date.now(),
      url: tab.url,
      title: tab.title || 'Untitled'
    };
    
    // Could store to chrome.storage.local for daily reports
    chrome.storage.local.get(['navigationLog'], (result) => {
      const log = result.navigationLog || [];
      log.push(event);
      
      // Keep only last 100 navigations
      const trimmed = log.slice(-100);
      
      chrome.storage.local.set({ navigationLog: trimmed }, () => {
        console.log('[TDP Background] Logged navigation event');
      });
    });
  }
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[TDP Background] Message received:', message);
  
  if (message.type === 'RISK_DETECTED') {
    // Update badge to show risk count
    chrome.action.setBadgeText({ text: String(message.count), tabId: sender.tab?.id });
    chrome.action.setBadgeBackgroundColor({ color: '#FFB020', tabId: sender.tab?.id }); // Warn orange
    
    // Store detection
    const detection = {
      timestamp: Date.now(),
      url: sender.tab?.url,
      title: sender.tab?.title,
      risks: message.risks
    };
    
    chrome.storage.local.get(['detections'], (result) => {
      const detections = result.detections || [];
      detections.push(detection);
      chrome.storage.local.set({ detections }, () => {
        console.log('[TDP Background] Stored risk detection');
      });
    });
  } else if (message.type === 'NO_RISKS') {
    // Reset badge to ON when page is clean
    chrome.action.setBadgeText({ text: 'ON', tabId: sender.tab?.id });
    chrome.action.setBadgeBackgroundColor({ color: '#2AD17B', tabId: sender.tab?.id }); // Safe green
    console.log('[TDP Background] Badge reset to ON (clean page)');
  }
  
  sendResponse({ received: true });
  return true;
});
