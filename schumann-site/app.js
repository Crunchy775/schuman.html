/* ─── Schumann Resonance Live Monitor — app.js ─── */

const IMAGES = [
  {
    imgId:    'img0',
    loaderId: 'loader0',
    errId:    'err0',
    wrapId:   'wrap0',
    url:      'http://sosrff.tsu.ru/new/shm.jpg',
  },
  {
    imgId:    'img1',
    loaderId: 'loader1',
    errId:    'err1',
    wrapId:   'wrap1',
    url:      'http://sosrff.tsu.ru/new/srf.jpg',
  },
  {
    imgId:    'img2',
    loaderId: 'loader2',
    errId:    'err2',
    wrapId:   'wrap2',
    url:      'http://sosrff.tsu.ru/new/sra.jpg',
  },
];

let loadedCount  = 0;
let errorCount   = 0;
let secondsLeft  = 15 * 60;
let clockInterval;
let countdownInterval;

/* ─── Load a single image ─── */
function loadImage(item) {
  const img     = document.getElementById(item.imgId);
  const loader  = document.getElementById(item.loaderId);
  const err     = document.getElementById(item.errId);

  // Reset state
  img.style.display    = 'none';
  img.classList.remove('loaded');
  err.style.display    = 'none';
  loader.style.display = 'flex';

  // Cache-bust: force browser to fetch latest version from Tomsk
  const url = item.url + '?t=' + Date.now();

  const probe = new Image();

  probe.onload = () => {
    img.src = url;
    img.style.display = 'block';
    loader.style.display = 'none';
    err.style.display    = 'none';
    // Small delay so browser has painted the element before animating
    requestAnimationFrame(() => img.classList.add('loaded'));
    loadedCount++;
    updateStatus();
  };

  probe.onerror = () => {
    loader.style.display = 'none';
    err.style.display    = 'flex';
    errorCount++;
    updateStatus();
  };

  probe.src = url;
}

/* ─── Refresh all images ─── */
function refreshAll() {
  loadedCount = 0;
  errorCount  = 0;

  // Animate refresh button
  const btn = document.getElementById('refresh-btn');
  if (btn) {
    btn.classList.add('spinning');
    setTimeout(() => btn.classList.remove('spinning'), 1500);
  }

  // Update last-refresh display
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  setEl('last-update', timeStr);

  setStatus('loading', 'Fetching latest data from Tomsk...');

  IMAGES.forEach(loadImage);
  resetCountdown();
}

/* Expose globally so onclick in HTML works */
window.refreshAll = refreshAll;

/* ─── Status bar ─── */
function setStatus(state, message) {
  const dot  = document.getElementById('status-dot');
  const text = document.getElementById('status-text');
  if (!dot || !text) return;

  dot.className = 'status-dot';

  if (state === 'loading') {
    dot.classList.add('status-loading');
  } else if (state === 'ok') {
    dot.classList.add('status-ok');
  } else {
    dot.classList.add('status-error');
  }

  text.textContent = message;
}

function updateStatus() {
  const total = IMAGES.length;
  const done  = loadedCount + errorCount;

  if (done < total) {
    setStatus('loading', `Loading charts... (${done}/${total})`);
    return;
  }

  if (errorCount === 0) {
    setStatus('ok', `All ${total} charts loaded successfully. Data from Tomsk Space Observing System.`);
  } else if (loadedCount === 0) {
    setStatus('error', 'Could not reach Tomsk server — it may be temporarily down. Try refreshing in a few minutes.');
  } else {
    setStatus('error', `${loadedCount} chart(s) loaded, ${errorCount} failed. Tomsk server may be partially unavailable.`);
  }
}

/* ─── Tomsk Clock ─── */
function getTomskTime() {
  const now    = new Date();
  const utcMs  = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + 7 * 3600000); // UTC+7
}

function updateClock() {
  const t   = getTomskTime();
  const h   = String(t.getHours()).padStart(2, '0');
  const m   = String(t.getMinutes()).padStart(2, '0');
  const s   = String(t.getSeconds()).padStart(2, '0');
  setEl('tomsk-time', `${h}:${m}:${s}`);
}

/* ─── Countdown ─── */
function resetCountdown() {
  secondsLeft = 15 * 60;
  renderCountdown();
}

function renderCountdown() {
  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  setEl('next-refresh', `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
}

function tickCountdown() {
  secondsLeft--;
  if (secondsLeft <= 0) {
    refreshAll();   // auto-refresh triggers reset inside
    return;
  }
  renderCountdown();
}

/* ─── Utility ─── */
function setEl(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  refreshAll();
  updateClock();
  clockInterval     = setInterval(updateClock, 1000);
  countdownInterval = setInterval(tickCountdown, 1000);
});
