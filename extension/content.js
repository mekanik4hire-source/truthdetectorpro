// TruthDetectorPro - Scam Radar Content Script
// Injected into every webpage to scan for risks

console.log('[TDP Content] Script loaded on:', window.location.href);

// Simple local risk detection rules (privacy-first, runs on device)
const RISK_PATTERNS = {
  phishing: [
    /verify your account/i,
    /urgent action required/i,
    /confirm your identity/i,
    /suspended account/i,
    /unusual activity detected/i,
    /click here immediately/i,
    /your account will be closed/i,
    /update payment method/i
  ],
  suspicious_urls: [
    /paypal-secure\.com/i,
    /amazon-verify\.net/i,
    /apple-support\.org/i,
    /microsoft-security\.com/i
  ]
};

// Scan page for risks
function scanPage() {
  const risks = [];
  const pageText = document.body.innerText || '';
  const currentUrl = window.location.href;
  
  // Check for phishing phrases
  RISK_PATTERNS.phishing.forEach((pattern, index) => {
    if (pattern.test(pageText)) {
      risks.push({
        type: 'phishing_phrase',
        severity: 'medium',
        description: `Detected common phishing phrase (pattern ${index + 1})`,
        pattern: pattern.source
      });
    }
  });
  
  // Check for suspicious URL patterns
  RISK_PATTERNS.suspicious_urls.forEach((pattern) => {
    if (pattern.test(currentUrl)) {
      risks.push({
        type: 'suspicious_url',
        severity: 'high',
        description: 'URL matches known scam pattern',
        pattern: pattern.source
      });
    }
  });
  
  // Check for password fields on non-HTTPS pages
  if (window.location.protocol !== 'https:') {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    if (passwordFields.length > 0) {
      risks.push({
        type: 'insecure_password',
        severity: 'high',
        description: 'Password field detected on non-HTTPS page',
        count: passwordFields.length
      });
    }
  }
  
  return risks;
}

// Run scan when page loads
setTimeout(() => {
  const risks = scanPage();
  
  if (risks.length > 0) {
    console.log('[TDP Content] Risks detected:', risks);
    
    // Notify background script
    chrome.runtime.sendMessage({
      type: 'RISK_DETECTED',
      count: risks.length,
      risks: risks
    });
    
    // Show warning ribbon (non-intrusive)
    showWarningRibbon(risks);
  } else {
    console.log('[TDP Content] No risks detected on this page');
    
    // Notify background script to reset badge to ON
    chrome.runtime.sendMessage({
      type: 'NO_RISKS'
    });
  }
}, 1000);

// Show dismissible warning ribbon at top of page
function showWarningRibbon(risks) {
  // Check if ribbon already exists
  if (document.getElementById('tdp-warning-ribbon')) {
    return;
  }
  
  const ribbon = document.createElement('div');
  ribbon.id = 'tdp-warning-ribbon';
  ribbon.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #FFB020 0%, #FF8C42 100%);
    color: #000;
    padding: 12px 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 600;
    z-index: 2147483647;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  
  const message = document.createElement('div');
  message.style.cssText = 'flex: 1; display: flex; align-items: center; gap: 10px;';
  
  const icon = document.createElement('span');
  icon.textContent = '⚠️';
  icon.style.fontSize = '18px';
  
  const text = document.createElement('span');
  text.textContent = `TruthDetectorPro detected ${risks.length} potential risk${risks.length > 1 ? 's' : ''} on this page`;
  
  message.appendChild(icon);
  message.appendChild(text);
  
  const dismissBtn = document.createElement('button');
  dismissBtn.textContent = '✕';
  dismissBtn.style.cssText = `
    background: rgba(0,0,0,0.1);
    border: none;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    padding: 4px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;
  `;
  dismissBtn.onmouseover = () => dismissBtn.style.background = 'rgba(0,0,0,0.2)';
  dismissBtn.onmouseout = () => dismissBtn.style.background = 'rgba(0,0,0,0.1)';
  dismissBtn.onclick = () => ribbon.remove();
  
  ribbon.appendChild(message);
  ribbon.appendChild(dismissBtn);
  
  document.body.prepend(ribbon);
  
  console.log('[TDP Content] Warning ribbon displayed');
}
