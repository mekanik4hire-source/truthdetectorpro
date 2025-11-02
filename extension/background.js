// TruthDetectorPro - Scam Radar Background Service Worker
// Runs continuously to monitor browsing and set badge status

console.log('[TDP Background] Service worker started');

// Set badge to show extension is active
chrome.runtime.onInstalled.addListener(() => {
  console.log('[TDP Background] Extension installed/updated');
  setBadgeActive();
});

// Also set badge when service worker starts (after browser restart, etc)
chrome.runtime.onStartup.addListener(() => {
  console.log('[TDP Background] Browser startup detected');
  setBadgeActive();
});

// Set initial badge immediately
setBadgeActive();

function setBadgeActive() {
  try {
    chrome.action.setBadgeText({ text: 'ON' }, () => {
      if (chrome.runtime.lastError) {
        console.error('[TDP Background] Badge text error:', chrome.runtime.lastError);
      } else {
        console.log('[TDP Background] Badge text set to ON');
      }
    });
    
    chrome.action.setBadgeBackgroundColor({ color: '#2AD17B' }, () => {
      if (chrome.runtime.lastError) {
        console.error('[TDP Background] Badge color error:', chrome.runtime.lastError);
      } else {
        console.log('[TDP Background] Badge color set to green');
      }
    });
  } catch (error) {
    console.error('[TDP Background] Error setting badge:', error);
  }
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
    const tabId = sender.tab?.id;
    chrome.action.setBadgeText({ text: String(message.count), tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: '#FFB020', tabId: tabId }); // Warn orange
    console.log(`[TDP Background] Badge updated to ${message.count} for tab ${tabId}`);
    
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
    const tabId = sender.tab?.id;
    chrome.action.setBadgeText({ text: 'ON', tabId: tabId });
    chrome.action.setBadgeBackgroundColor({ color: '#2AD17B', tabId: tabId }); // Safe green
    console.log(`[TDP Background] Badge reset to ON for tab ${tabId}`);
  }
  
  sendResponse({ received: true });
  return true;
});
