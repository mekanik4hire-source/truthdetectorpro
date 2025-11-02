// TruthDetectorPro - Popup UI Logic

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[TDP Popup] Loaded');
  
  // Load stats from storage
  const { navigationLog = [], detections = [] } = await chrome.storage.local.get(['navigationLog', 'detections']);
  
  // Update stats
  document.getElementById('totalScans').textContent = navigationLog.length;
  document.getElementById('risksFound').textContent = detections.length;
  
  // Show recent activity
  displayRecentActivity(navigationLog, detections);
  
  // Button handlers
  document.getElementById('viewReportBtn').addEventListener('click', viewDailyReport);
  document.getElementById('exportDataBtn').addEventListener('click', exportData);
  document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
});

function displayRecentActivity(navigationLog, detections) {
  const activityList = document.getElementById('activityList');
  
  if (navigationLog.length === 0) {
    activityList.innerHTML = '<p class="empty-state">No recent activity</p>';
    return;
  }
  
  // Get last 5 navigations
  const recent = navigationLog.slice(-5).reverse();
  
  activityList.innerHTML = recent.map(nav => {
    const url = new URL(nav.url);
    const domain = url.hostname;
    const hasRisk = detections.some(d => d.url === nav.url);
    
    return `
      <div class="activity-item">
        <div class="activity-domain">${domain}</div>
        <div class="${hasRisk ? 'activity-risk' : 'activity-safe'}">
          ${hasRisk ? '⚠️ Risks detected' : '✓ Clean'}
        </div>
      </div>
    `;
  }).join('');
}

async function viewDailyReport() {
  const { detections = [] } = await chrome.storage.local.get(['detections']);
  
  if (detections.length === 0) {
    alert('No risks detected today. Keep browsing safely!');
    return;
  }
  
  // Group by date
  const today = new Date().toDateString();
  const todayDetections = detections.filter(d => {
    return new Date(d.timestamp).toDateString() === today;
  });
  
  let report = `TruthDetectorPro Daily Report\n`;
  report += `Date: ${today}\n`;
  report += `Total Risks Detected: ${todayDetections.length}\n\n`;
  
  todayDetections.forEach((d, i) => {
    const url = new URL(d.url);
    report += `${i + 1}. ${url.hostname}\n`;
    report += `   Time: ${new Date(d.timestamp).toLocaleTimeString()}\n`;
    report += `   Risks: ${d.risks.map(r => r.type).join(', ')}\n\n`;
  });
  
  // Open in new tab with formatted report
  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  chrome.tabs.create({ url });
}

async function exportData() {
  const data = await chrome.storage.local.get(['navigationLog', 'detections']);
  
  const exportData = {
    exported: new Date().toISOString(),
    stats: {
      totalScans: data.navigationLog?.length || 0,
      totalRisks: data.detections?.length || 0
    },
    navigationLog: data.navigationLog || [],
    detections: data.detections || []
  };
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `truthdetectorpro_export_${Date.now()}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
  
  console.log('[TDP Popup] Data exported');
}

async function clearHistory() {
  if (!confirm('Clear all history and detections? This cannot be undone.')) {
    return;
  }
  
  await chrome.storage.local.clear();
  
  // Reset UI
  document.getElementById('totalScans').textContent = '0';
  document.getElementById('risksFound').textContent = '0';
  document.getElementById('activityList').innerHTML = '<p class="empty-state">No recent activity</p>';
  
  // Reset badge
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.action.setBadgeBackgroundColor({ color: '#2AD17B' });
  
  console.log('[TDP Popup] History cleared');
}
