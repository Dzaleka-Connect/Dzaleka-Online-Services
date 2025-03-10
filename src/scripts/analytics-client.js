/**
 * Client-side script for the analytics display
 */

// Variables for tracking
let previousPage = null;
let pageLoadTime = new Date();

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// A simple mock Chart class for when Chart.js isn't available
class SimpleChart {
  constructor(ctx, config) {
    this.ctx = ctx;
    this.config = config;
    this.id = Math.random().toString(36).substring(2, 15);
    this.data = config.data;
    this.options = config.options || {};
    
    // Render placeholder
    this.renderPlaceholder();
  }
  
  renderPlaceholder() {
    if (!this.ctx) return;
    
    try {
      const canvas = this.ctx;
      const context = canvas.getContext('2d');
      
      if (!context) return;
      
      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      context.fillStyle = '#f8f9fa';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw border
      context.strokeStyle = '#dee2e6';
      context.lineWidth = 2;
      context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
      
      // Draw text
      context.fillStyle = '#6c757d';
      context.font = '14px Arial, sans-serif';
      context.textAlign = 'center';
      context.fillText('Chart visualization', canvas.width / 2, canvas.height / 2 - 15);
      context.fillText('(requires Chart.js)', canvas.width / 2, canvas.height / 2 + 15);
    } catch (error) {
      console.warn('Error rendering chart placeholder:', error);
    }
  }
  
  update() {
    this.renderPlaceholder();
  }
  
  destroy() {
    // Nothing to do for the mock implementation
  }
}

// Return an empty analytics data structure
const getEmptyAnalyticsStructure = () => {
  return {
    pageViews: {},
    sessions: {},
    visitors: {},
    referrers: {},
    devices: {},
    browsers: {},
    screenSizes: {},
    languages: {},
    timeOnPage: {},
    loadTimes: {},
    entryPages: {},
    exitPages: {},
    firstVisit: null,
    lastVisit: null,
    totalViews: getTotalViews() // Always use current total views
  };
};

// Add these utility functions at the top of the file
function calculateBounceRate(data) {
  if (!data?.sessions) return 0;
  const totalSessions = Object.keys(data.sessions).length;
  const bounceSessions = Object.values(data.sessions).filter(session => session.pageViews === 1).length;
  return totalSessions > 0 ? Math.round((bounceSessions / totalSessions) * 100) : 0;
}

function calculateAvgSessionDuration(data) {
  if (!data?.sessions) return 0;
  const sessions = Object.values(data.sessions);
  const totalDuration = sessions.reduce((acc, session) => {
    const start = new Date(session.startTime);
    const end = new Date(session.lastActive);
    return acc + (end - start) / 1000;
  }, 0);
  return sessions.length > 0 ? Math.round(totalDuration / sessions.length) : 0;
}

function calculatePagesPerSession(data) {
  if (!data?.sessions) return 0;
  const sessions = Object.values(data.sessions);
  const totalPageViews = sessions.reduce((acc, session) => acc + (session.pageViews || 0), 0);
  return sessions.length > 0 ? (totalPageViews / sessions.length).toFixed(1) : '0.0';
}

// Modified normalizeAnalyticsData function with browser checks
const normalizeAnalyticsData = (data) => {
  if (!data || typeof data !== 'object') {
    return getEmptyAnalyticsStructure();
  }
  
  // Create a new object with the empty structure as base
  const normalized = { ...getEmptyAnalyticsStructure() };
  
  // Always use the current total views
  normalized.totalViews = getTotalViews();
  
  // Copy and normalize pageViews
  if (data.pageViews && typeof data.pageViews === 'object') {
    Object.entries(data.pageViews).forEach(([path, count]) => {
      normalized.pageViews[path] = typeof count === 'number' ? count : parseInt(count) || 0;
    });
  }
  
  // Copy and normalize sessions
  if (data.sessions && typeof data.sessions === 'object') {
    Object.entries(data.sessions).forEach(([id, session]) => {
      if (session && typeof session === 'object') {
        normalized.sessions[id] = {
          startTime: session.startTime || new Date().toISOString(),
          lastActive: session.lastActive || new Date().toISOString(),
          pageViews: typeof session.pageViews === 'number' ? session.pageViews : 1,
          pages: Array.isArray(session.pages) ? session.pages : [isBrowser ? window.location.pathname : '/'],
          entryPage: session.entryPage || (isBrowser ? window.location.pathname : '/'),
          device: session.device || (isBrowser ? getDeviceType() : 'unknown'),
          browser: session.browser || (isBrowser ? getBrowserName() : 'unknown'),
          screenSize: session.screenSize || (isBrowser ? `${window.innerWidth}x${window.innerHeight}` : 'unknown'),
          language: session.language || (isBrowser ? (navigator.language || 'unknown') : 'unknown'),
          visitorId: session.visitorId || (isBrowser ? getVisitorId() : 'unknown')
        };
      }
    });
  }
  
  // Rest of the function remains the same...
  
  return normalized;
};

// Modify the storage mechanism to use multiple storage methods
const STORAGE_KEYS = {
  LOCAL: 'dzaleka_analytics',
  SESSION: 'dzaleka_analytics_session',
  INDEXED_DB: 'dzaleka_analytics_db',
  MEMORY: new Map()
};

// Initialize IndexedDB
const initIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('DzalekaAnalytics', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('analytics')) {
        db.createObjectStore('analytics', { keyPath: 'id' });
      }
    };
  });
};

// Store data in IndexedDB
const storeInIndexedDB = async (data) => {
  try {
    const db = await initIndexedDB();
    const tx = db.transaction('analytics', 'readwrite');
    const store = tx.objectStore('analytics');
    await store.put({ id: 'main', ...data });
    return true;
  } catch (error) {
    console.warn('IndexedDB storage failed:', error);
    return false;
  }
};

// Get data from IndexedDB
const getFromIndexedDB = async () => {
  try {
    const db = await initIndexedDB();
    const tx = db.transaction('analytics', 'readonly');
    const store = tx.objectStore('analytics');
    const request = store.get('main');
    
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('IndexedDB retrieval failed:', error);
    return null;
  }
};

// Modified storeAnalyticsData function
const storeAnalyticsData = async (data) => {
  if (!data) return null;
  
  const dataCopy = JSON.parse(JSON.stringify(data));
  const timestamp = new Date().toISOString();
  dataCopy.lastUpdated = timestamp;
  
  // Try all storage methods
  try {
    // 1. LocalStorage
    localStorage.setItem(STORAGE_KEYS.LOCAL, JSON.stringify(dataCopy));
  } catch (e) {
    console.warn('LocalStorage failed:', e);
  }
  
  try {
    // 2. SessionStorage
    sessionStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(dataCopy));
  } catch (e) {
    console.warn('SessionStorage failed:', e);
  }
  
  try {
    // 3. IndexedDB
    await storeInIndexedDB(dataCopy);
  } catch (e) {
    console.warn('IndexedDB failed:', e);
  }
  
  // 4. Memory Storage (always works)
  STORAGE_KEYS.MEMORY.set('analytics', dataCopy);
  
  // 5. Service Worker Cache (if available)
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    try {
      await caches.open('analytics-cache').then(cache => {
        return cache.put('/analytics-data', new Response(JSON.stringify(dataCopy)));
      });
    } catch (e) {
      console.warn('Service Worker cache failed:', e);
    }
  }
  
  return dataCopy;
};

// Modified getAnalyticsData function
const getAnalyticsData = async () => {
  let data = null;
  
  // Try all storage methods in order
  try {
    // 1. Try LocalStorage
    const localData = localStorage.getItem(STORAGE_KEYS.LOCAL);
    if (localData) {
      data = JSON.parse(localData);
    }
  } catch (e) {
    console.warn('LocalStorage retrieval failed:', e);
  }
  
  if (!data) {
    try {
      // 2. Try SessionStorage
      const sessionData = sessionStorage.getItem(STORAGE_KEYS.SESSION);
      if (sessionData) {
        data = JSON.parse(sessionData);
      }
    } catch (e) {
      console.warn('SessionStorage retrieval failed:', e);
    }
  }
  
  if (!data) {
    try {
      // 3. Try IndexedDB
      data = await getFromIndexedDB();
    } catch (e) {
      console.warn('IndexedDB retrieval failed:', e);
    }
  }
  
  if (!data) {
    // 4. Try Memory Storage
    data = STORAGE_KEYS.MEMORY.get('analytics');
  }
  
  if (!data) {
    try {
      // 5. Try Service Worker Cache
      const cache = await caches.open('analytics-cache');
      const response = await cache.match('/analytics-data');
      if (response) {
        data = await response.json();
      }
    } catch (e) {
      console.warn('Service Worker cache retrieval failed:', e);
    }
  }
  
  // If no data found in any storage, initialize new data
  if (!data) {
    data = getEmptyAnalyticsStructure();
    await storeAnalyticsData(data);
  }
  
  return data;
};

// Check if current page is the analytics page
const isAnalyticsPage = () => {
  return window.location.pathname.includes('/analytics');
};

// Get the device type
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

// Get the browser name
const getBrowserName = () => {
  const ua = navigator.userAgent;
  
  // Extract browser name from user agent
  if (ua.indexOf('Chrome') > -1) return 'Chrome';
  if (ua.indexOf('Safari') > -1) return 'Safari';
  if (ua.indexOf('Firefox') > -1) return 'Firefox';
  if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) return 'IE';
  if (ua.indexOf('Edge') > -1) return 'Edge';
  if (ua.indexOf('Opera') > -1) return 'Opera';
  
  return 'Unknown';
};

// Get screen size category
const getScreenSize = () => {
  const width = window.innerWidth;
  
  if (width < 576) return 'xs';
  if (width < 768) return 'sm';
  if (width < 992) return 'md';
  if (width < 1200) return 'lg';
  return 'xl';
};

// Get page load time in milliseconds
const getPageLoadTime = () => {
  if (window.performance && window.performance.timing) {
    return window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
  }
  return 0;
};

// Get total time on site for the current session
const getTotalTimeOnSite = () => {
  try {
    const sessionId = getSessionId();
    const data = getAnalyticsData();
    
    if (data.sessions && data.sessions[sessionId]) {
      const startTime = new Date(data.sessions[sessionId].startTime);
      const now = new Date();
      return Math.floor((now - startTime) / 1000); // in seconds
    }
    
    return 0;
  } catch (error) {
    console.error('Error calculating time on site:', error);
    return 0;
  }
};

// Record time spent on a page
const recordTimeOnPage = (path) => {
  try {
    if (!path || !pageLoadTime) return;
    
    const timeSpent = Math.floor((new Date() - pageLoadTime) / 1000); // in seconds
    
    // Don't record if time is unreasonably long (likely left tab open)
    if (timeSpent > 3600) return; // More than an hour
    
    const data = getAnalyticsData();
    
    if (!data.timeOnPage) {
      data.timeOnPage = {};
    }
    
    if (!data.timeOnPage[path]) {
      data.timeOnPage[path] = { total: 0, count: 0 };
    }
    
    data.timeOnPage[path].total += timeSpent;
    data.timeOnPage[path].count++;
    
    storeAnalyticsData(data);
    
    return timeSpent;
  } catch (error) {
    console.error('Error recording time on page:', error);
    return 0;
  }
};

// Modified recordPageView function to use new total views tracking
const recordPageView = async (path = window.location.pathname) => {
  try {
    if (isAnalyticsPage()) return;

    const timestamp = new Date().toISOString();
    const sessionId = getSessionId();
    const visitorId = getVisitorId();
    
    // Get current data or initialize new structure
    let currentData = await getAnalyticsData();
    
    // Initialize data structure if needed
    if (!currentData || Object.keys(currentData).length === 0) {
      currentData = getEmptyAnalyticsStructure();
      currentData.firstVisit = timestamp;
      currentData.lastVisit = timestamp;
    }

    // Record page view and update total views
    currentData.pageViews[path] = (currentData.pageViews[path] || 0) + 1;
    currentData.totalViews = updateTotalViews();

    // Record referrer
    const referrer = document.referrer;
    if (referrer && !referrer.includes(window.location.hostname)) {
      const referrerDomain = new URL(referrer).hostname;
      currentData.referrers[referrerDomain] = (currentData.referrers[referrerDomain] || 0) + 1;
    }

    // Record device info
    const deviceType = getDeviceType();
    currentData.devices[deviceType] = (currentData.devices[deviceType] || 0) + 1;

    // Record browser info
    const browserName = getBrowserName();
    currentData.browsers[browserName] = (currentData.browsers[browserName] || 0) + 1;

    // Record screen size
    const screenSize = getScreenSize();
    currentData.screenSizes[screenSize] = (currentData.screenSizes[screenSize] || 0) + 1;

    // Record language
    const language = navigator.language || navigator.userLanguage || 'unknown';
    currentData.languages[language] = (currentData.languages[language] || 0) + 1;

    // Update session data
    if (!currentData.sessions[sessionId]) {
      currentData.sessions[sessionId] = {
        startTime: timestamp,
        lastActive: timestamp,
        pageViews: 1,
        pages: [path],
        entryPage: path,
        loadTimes: [],
        timeOnPage: {}
      };
      // Record entry page
      currentData.entryPages[path] = (currentData.entryPages[path] || 0) + 1;
    } else {
      currentData.sessions[sessionId].lastActive = timestamp;
      currentData.sessions[sessionId].pageViews += 1;
      currentData.sessions[sessionId].pages.push(path);
      
      // Record load time
      if (window.performance) {
        const loadTime = window.performance.now();
        currentData.sessions[sessionId].loadTimes.push(loadTime);
      }
    }

    // Record time on previous page if exists
    if (previousPage && currentData.sessions[sessionId].timeOnPage) {
      const timeSpent = Date.now() - pageLoadTime.getTime();
      currentData.sessions[sessionId].timeOnPage[previousPage] = timeSpent;
      
      // Update global time on page metrics
      if (!currentData.timeOnPage[previousPage]) {
        currentData.timeOnPage[previousPage] = { total: 0, count: 0 };
      }
      currentData.timeOnPage[previousPage].total += timeSpent;
      currentData.timeOnPage[previousPage].count += 1;
    }

    // Update visitor data
    const today = new Date().toISOString().split('T')[0];
    if (!currentData.visitors[today]) {
      currentData.visitors[today] = [];
    }
    // Only add visitor if not already counted today
    if (!currentData.visitors[today].includes(visitorId)) {
      currentData.visitors[today].push(visitorId);
    }

    // Update timestamps
    if (!currentData.firstVisit || new Date(currentData.firstVisit) > new Date(timestamp)) {
      currentData.firstVisit = timestamp;
    }
    currentData.lastVisit = timestamp;

    // Store the updated data
    await storeAnalyticsData(currentData);
    
    // Reset page load time for next measurement
    pageLoadTime = new Date();
    previousPage = path;

    return currentData;
  } catch (error) {
    console.error('Error recording page view:', error);
    return getEmptyAnalyticsStructure();
  }
};

// Get a session ID that persists for this browsing session
const getSessionId = () => {
  try {
    // Try to get existing session ID
    let sessionId = sessionStorage.getItem('dzaleka_session_id');
    
    // Create a new session ID if none exists
    if (!sessionId) {
      sessionId = 'session_' + new Date().getTime() + '_' + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem('dzaleka_session_id', sessionId);
    }
    
    return sessionId;
  } catch (error) {
    // Fallback if sessionStorage is not available
    return 'session_' + new Date().getTime() + '_' + Math.random().toString(36).substring(2, 9);
  }
};

// Get a visitor ID that persists across sessions
const getVisitorId = () => {
  try {
    // Try to get existing visitor ID from localStorage
    let visitorId = localStorage.getItem('dzaleka_visitor_id');
    
    // Create a new visitor ID if none exists
    if (!visitorId) {
      visitorId = 'visitor_' + new Date().getTime() + '_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('dzaleka_visitor_id', visitorId);
      
      // Also store in sessionStorage as backup
      try {
        sessionStorage.setItem('dzaleka_visitor_id', visitorId);
      } catch (e) {
        // Ignore errors
      }
    }
    
    return visitorId;
  } catch (error) {
    // Try to get from sessionStorage if localStorage fails
    try {
      let visitorId = sessionStorage.getItem('dzaleka_visitor_id');
      
      if (!visitorId) {
        visitorId = 'visitor_' + new Date().getTime() + '_' + Math.random().toString(36).substring(2, 9);
        sessionStorage.setItem('dzaleka_visitor_id', visitorId);
      }
      
      return visitorId;
    } catch (e) {
      // Generate a temporary ID if all storage methods fail
      return 'visitor_' + new Date().getTime() + '_' + Math.random().toString(36).substring(2, 9);
    }
  }
};

// Get fallback data for when storage is not available
const getFallbackData = () => {
  return {
    pageViews: {},
    sessions: {},
    visitors: {},
    referrers: {},
    devices: {},
    browsers: {},
    screenSizes: {},
    languages: {},
    timeOnPage: {},
    loadTimes: {},
    entryPages: {},
    exitPages: {},
    firstVisit: new Date().toISOString(),
    lastVisit: new Date().toISOString(),
    totalViews: 0
  };
};

// Export analytics data to a JSON file
const exportAnalyticsData = () => {
  try {
    const data = getAnalyticsData();
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'dzaleka_analytics_' + new Date().toISOString().split('T')[0] + '.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    return true;
  } catch (error) {
    console.error('Error exporting analytics data:', error);
    return false;
  }
};

/**
 * Merges two analytics data objects, preserving the most comprehensive information from both
 * @param {Object} currentData - The existing analytics data
 * @param {Object} importedData - The imported analytics data to merge
 * @returns {Object} - The merged analytics data
 */
const mergeAnalyticsData = (currentData, importedData) => {
  if (!currentData || Object.keys(currentData).length === 0) return importedData;
  if (!importedData || Object.keys(importedData).length === 0) return currentData;
  
  // Create a deep copy of current data as the base for merging
  const mergedData = JSON.parse(JSON.stringify(currentData));
  
  // Merge page views
  if (importedData.pageViews) {
    mergedData.pageViews = mergedData.pageViews || {};
    Object.entries(importedData.pageViews).forEach(([path, count]) => {
      mergedData.pageViews[path] = (mergedData.pageViews[path] || 0) + count;
    });
  }
  
  // Merge sessions (keep both sets of sessions)
  if (importedData.sessions) {
    mergedData.sessions = mergedData.sessions || {};
    Object.entries(importedData.sessions).forEach(([id, session]) => {
      // Only add if session doesn't already exist
      if (!mergedData.sessions[id]) {
        mergedData.sessions[id] = session;
      }
    });
  }
  
  // Merge visitors data by date
  if (importedData.visitors) {
    mergedData.visitors = mergedData.visitors || {};
    Object.entries(importedData.visitors).forEach(([date, visitors]) => {
      if (!mergedData.visitors[date]) {
        mergedData.visitors[date] = [];
      }
      
      // Add unique visitors that don't already exist
      visitors.forEach(visitor => {
        const visitorExists = mergedData.visitors[date].some(v => 
          v.id === visitor.id && v.deviceId === visitor.deviceId
        );
        
        if (!visitorExists) {
          mergedData.visitors[date].push(visitor);
        }
      });
    });
  }
  
  // Merge referrers
  if (importedData.referrers) {
    mergedData.referrers = mergedData.referrers || {};
    Object.entries(importedData.referrers).forEach(([domain, count]) => {
      mergedData.referrers[domain] = (mergedData.referrers[domain] || 0) + count;
    });
  }
  
  // Merge device data
  if (importedData.devices) {
    mergedData.devices = mergedData.devices || {};
    Object.entries(importedData.devices).forEach(([device, count]) => {
      mergedData.devices[device] = (mergedData.devices[device] || 0) + count;
    });
  }
  
  // Merge browser data
  if (importedData.browsers) {
    mergedData.browsers = mergedData.browsers || {};
    Object.entries(importedData.browsers).forEach(([browser, count]) => {
      mergedData.browsers[browser] = (mergedData.browsers[browser] || 0) + count;
    });
  }
  
  // Merge screen sizes
  if (importedData.screenSizes) {
    mergedData.screenSizes = mergedData.screenSizes || {};
    Object.entries(importedData.screenSizes).forEach(([size, count]) => {
      mergedData.screenSizes[size] = (mergedData.screenSizes[size] || 0) + count;
    });
  }
  
  // Merge languages
  if (importedData.languages) {
    mergedData.languages = mergedData.languages || {};
    Object.entries(importedData.languages).forEach(([lang, count]) => {
      mergedData.languages[lang] = (mergedData.languages[lang] || 0) + count;
    });
  }
  
  // Merge time on page data
  if (importedData.timeOnPage) {
    mergedData.timeOnPage = mergedData.timeOnPage || {};
    Object.entries(importedData.timeOnPage).forEach(([path, data]) => {
      if (!mergedData.timeOnPage[path]) {
        mergedData.timeOnPage[path] = { total: 0, count: 0 };
      }
      mergedData.timeOnPage[path].total += data.total || 0;
      mergedData.timeOnPage[path].count += data.count || 0;
    });
  }
  
  // Merge load times
  if (importedData.loadTimes) {
    mergedData.loadTimes = mergedData.loadTimes || {};
    Object.entries(importedData.loadTimes).forEach(([path, times]) => {
      mergedData.loadTimes[path] = mergedData.loadTimes[path] || [];
      mergedData.loadTimes[path] = [...mergedData.loadTimes[path], ...times];
    });
  }
  
  // Merge entry pages
  if (importedData.entryPages) {
    mergedData.entryPages = mergedData.entryPages || {};
    Object.entries(importedData.entryPages).forEach(([path, count]) => {
      mergedData.entryPages[path] = (mergedData.entryPages[path] || 0) + count;
    });
  }
  
  // Merge exit pages
  if (importedData.exitPages) {
    mergedData.exitPages = mergedData.exitPages || {};
    Object.entries(importedData.exitPages).forEach(([path, count]) => {
      mergedData.exitPages[path] = (mergedData.exitPages[path] || 0) + count;
    });
  }
  
  // Merge custom events if they exist
  if (importedData.customEvents) {
    mergedData.customEvents = mergedData.customEvents || {};
    Object.entries(importedData.customEvents).forEach(([eventName, events]) => {
      mergedData.customEvents[eventName] = mergedData.customEvents[eventName] || [];
      mergedData.customEvents[eventName] = [...mergedData.customEvents[eventName], ...events];
    });
  }
  
  // Merge goals if they exist
  if (importedData.goals) {
    mergedData.goals = mergedData.goals || {};
    Object.entries(importedData.goals).forEach(([goalName, data]) => {
      if (!mergedData.goals[goalName]) {
        mergedData.goals[goalName] = { completions: 0, value: 0 };
      }
      mergedData.goals[goalName].completions += data.completions || 0;
      mergedData.goals[goalName].value += data.value || 0;
    });
  }
  
  // Merge countries data
  if (importedData.countries) {
    mergedData.countries = mergedData.countries || {};
    Object.entries(importedData.countries).forEach(([country, count]) => {
      mergedData.countries[country] = (mergedData.countries[country] || 0) + count;
    });
  }
  
  // Update total views
  mergedData.totalViews = (mergedData.totalViews || 0) + (importedData.totalViews || 0);
  
  // Use the earliest first visit date
  if (importedData.firstVisit && (!mergedData.firstVisit || new Date(importedData.firstVisit) < new Date(mergedData.firstVisit))) {
    mergedData.firstVisit = importedData.firstVisit;
  }
  
  // Use the latest last visit date
  if (importedData.lastVisit && (!mergedData.lastVisit || new Date(importedData.lastVisit) > new Date(mergedData.lastVisit))) {
    mergedData.lastVisit = importedData.lastVisit;
  }
  
  // Update the lastUpdated timestamp
  mergedData.lastUpdated = new Date().toISOString();
  
  return mergedData;
};

// Import analytics data from a JSON file
const importAnalyticsData = (jsonData) => {
  try {
    if (!jsonData) {
      return false;
    }
    
    // Parse the JSON data
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    // Validate the data structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format');
    }
    
    // Merge with existing data to avoid losing current session info
    const currentData = getAnalyticsData();
    const mergedData = mergeAnalyticsData(currentData, data);
    
    // Store the merged data
    storeAnalyticsData(mergedData);
    
    return true;
  } catch (error) {
    console.error('Error importing analytics data:', error);
    return false;
  }
};

// Initialize analytics data on page load
if (typeof window !== 'undefined') {
  // Track page unload to record time on page
  window.addEventListener('beforeunload', () => {
    try {
      if (previousPage) {
        recordTimeOnPage(previousPage);
      }
    } catch (error) {
      // Ignore errors on page unload
      console.warn('Error on page unload:', error);
    }
  });
  
  // Initialize tracking on page load
  if (!isAnalyticsPage()) {
    window.addEventListener('DOMContentLoaded', () => {
      // Record the current page view
      recordPageView();
      
      // Set the current page as the previous page for tracking time on page
      previousPage = window.location.pathname;
    });
  }
}

// Initialize analytics function (not exported here)
function initializeAnalytics() {
  try {
    // Try to get existing analytics data from localStorage
    const existingData = localStorage.getItem('dzaleka_analytics');
    
    // Initialize with default structure if no data exists
    if (!existingData) {
      const timestamp = new Date().toISOString();
      const sessionId = getSessionId();
      const visitorId = getVisitorId();
      
      // Create a new analytics data structure
      const initialData = {
        firstVisit: timestamp,
        lastVisit: timestamp,
        pageViews: {},
        visitors: { [visitorId]: timestamp },
        sessions: {
          [sessionId]: {
            startTime: timestamp,
            lastActive: timestamp,
            device: getDeviceType(),
            browser: getBrowserName(),
            screenSize: getScreenSize(),
            language: navigator.language || navigator.userLanguage || 'unknown',
            pageViews: 0
          }
        },
        // ... rest of the data structure
      };
      
      // Store the initial data
      localStorage.setItem('dzaleka_analytics', JSON.stringify(initialData));
      return initialData;
    }
    
    // Return the existing data
    return JSON.parse(existingData);
  } catch (error) {
    console.error('Error initializing analytics:', error);
    return getEmptyAnalyticsStructure();
  }
}

// Export necessary functions
export {
  initializeAnalytics,  // Export only once
  recordPageView,
  getAnalyticsData,
  recordTimeOnPage,
  getDeviceType,
  getBrowserName,
  getScreenSize,
  getPageLoadTime,
  getTotalTimeOnSite,
  exportAnalyticsData,
  importAnalyticsData,
  getSessionId,
  getVisitorId,
  getFallbackData,
  storeAnalyticsData,
  getEmptyAnalyticsStructure,
  mergeAnalyticsData,
  isAnalyticsPage,
  SimpleChart,
  calculateBounceRate,
  calculateAvgSessionDuration,
  calculatePagesPerSession,
  getTotalViews,
  updateTotalViews
};

export function trackCustomEvent(eventName, eventData) {
  const analytics = getAnalyticsData();
  
  if (!analytics.customEvents) {
    analytics.customEvents = {};
  }
  
  if (!analytics.customEvents[eventName]) {
    analytics.customEvents[eventName] = [];
  }
  
  analytics.customEvents[eventName].push({
    timestamp: new Date().toISOString(),
    data: eventData
  });
  
  storeAnalyticsData(analytics);
}

export function trackGoalCompletion(goalName, value = 1) {
  const analytics = getAnalyticsData();
  
  if (!analytics.goals) {
    analytics.goals = {};
  }
  
  if (!analytics.goals[goalName]) {
    analytics.goals[goalName] = {
      completions: 0,
      value: 0
    };
  }
  
  analytics.goals[goalName].completions++;
  analytics.goals[goalName].value += value;
  
  storeAnalyticsData(analytics);
}