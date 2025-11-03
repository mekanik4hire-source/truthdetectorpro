// TruthDetectorPro - Scam Radar Background Service Worker
// Runs continuously to monitor browsing and set badge status

console.log('[Background] Service worker started');

// Set badge to show extension is active
chrome.runtime.onInstalled.addListener(() => {
  console.log('[Background] Extension installed/updated');
  setBadgeActive();
});

// Set initial badge immediately
setBadgeActive();

async function setBadgeActive() {
  try {
    await chrome.action.setBadgeText({ text: 'ON' });
    await chrome.action.setBadgeBackgroundColor({ color: '#2AD17B' });
    console.log('[Background] Badge set to ON (green)');
  } catch (error) {
    console.error('[Background] Error setting badge:', error);
  }
}

// Listen for tab updates to log navigation
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('[Background] Page loaded:', tab.url);
    
    try {
      // Store basic navigation event (privacy-first: no content)
      const event = {
        timestamp: Date.now(),
        url: tab.url,
        title: tab.title || 'Untitled'
      };
      
      const result = await chrome.storage.local.get(['navigationLog']);
      const log = result.navigationLog || [];
      log.push(event);
      
      // Keep only last 100 navigations
      const trimmed = log.slice(-100);
      
      await chrome.storage.local.set({ navigationLog: trimmed });
      console.log('[Background] Logged navigation event');
    } catch (error) {
      console.error('[Background] Error logging navigation:', error);
    }
  }
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Background] Message received:', message);
  
  (async () => {
    try {
      if (message.type === 'RISK_DETECTED') {
        const tabId = sender.tab?.id;
        
        // Update badge to show risk count
        await chrome.action.setBadgeText({ text: String(message.count), tabId });
        await chrome.action.setBadgeBackgroundColor({ color: '#FFB020', tabId });
        console.log(`[Background] Badge updated to ${message.count} for tab ${tabId}`);
        
        // Store detection
        const detection = {
          timestamp: Date.now(),
          url: sender.tab?.url,
          title: sender.tab?.title,
          risks: message.risks
        };
        
        const result = await chrome.storage.local.get(['detections']);
        const detections = result.detections || [];
        detections.push(detection);
        await chrome.storage.local.set({ detections });
        console.log('[Background] Stored risk detection');
        
      } else if (message.type === 'NO_RISKS') {
        const tabId = sender.tab?.id;
        
        // Reset badge to ON when page is clean
        await chrome.action.setBadgeText({ text: 'ON', tabId });
        await chrome.action.setBadgeBackgroundColor({ color: '#2AD17B', tabId });
        console.log(`[Background] Badge reset to ON for tab ${tabId}`);
      }
      
      sendResponse({ received: true });
    } catch (error) {
      console.error('[Background] Error handling message:', error);
      sendResponse({ error: error.message });
    }
  })();
  
  return true; // Keep message channel open for async response
});
