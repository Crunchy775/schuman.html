/* ─── Schumann Resonance Live Monitor — app.js ─── */

const IMAGES = [
  {
    imgId: 'img0',
    loaderId: 'loader0',
    errId: 'err0',
    url: 'https://sosrff.tsu.ru/new/shm.jpg',
  },
  {
    imgId: 'img1',
    loaderId: 'loader1',
    errId: 'err1',
    url: 'https://sosrff.tsu.ru/new/srf.jpg',
  },
  {
    imgId: 'img2',
    loaderId: 'loader2',
    errId: 'err2',
    url: 'https://sosrff.tsu.ru/new/sra.jpg',
  },
];

let loadedCount = 0;
let errorCount = 0;

function loadImage(item) {
  const img = document.getElementById(item.imgId);
  const loader = document.getElementById(item.loaderId);
  const err = document.getElementById(item.errId);

  if (!img || !loader || !err) return;

  loader.style.display = 'flex';
  err.style.display = 'none';
  img.style.display = 'none';

  const url = item.url + '?t=' + Date.now();

  const testImg = new Image();

  testImg.onload = () => {
    img.src = url;
    img.style.display = 'block';
    loader.style.display = 'none';
    loadedCount++;
    updateStatus();
  };

  testImg.onerror = () => {
    loader.style.display = 'none';
    err.style.display = 'flex';
    errorCount++;
    updateStatus();
  };

  testImg.src = url;
}

function refreshAll() {
  loadedCount = 0;
  errorCount = 0;

  const btn = document.getElementById('refresh-btn');
  if (btn) {
    btn.classList.add('spinning');
    setTimeout(() => btn.classList.remove('spinning'), 1200);
  }

  setStatus('loading', 'Loading Schumann Resonance data...');

  IMAGES.forEach(loadImage);
}

/* status */
function setStatus(state, msg) {
  const dot = document.getElementById('status-dot');
  const text = document.getElementById('status-text');
  if (!dot || !text) return;

  dot.className = 'status-dot';

  if (state === 'loading') dot.classList.add('status-loading');
  else if (state === 'ok') dot.classList.add('status-ok');
  else dot.classList.add('status-error');

  text.textContent = msg;
}

function updateStatus() {
  const total = IMAGES.length;
  const done = loadedCount + errorCount;

  if (done < total) {
    setStatus('loading', `Loading... (${done}/${total})`);
    return;
  }

  if (errorCount === 0) {
    setStatus('ok', 'All charts loaded successfully');
  } else if (loadedCount === 0) {
    setStatus('error', 'Failed to load data source');
  } else {
    setStatus('error', `${loadedCount}/${total} loaded`);
  }
}

/* clock */
function updateClock() {
  const el = document.getElementById('tomsk-time');
  if (!el) return;

  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const tomsk = new Date(utc + 7 * 3600000);

  el.textContent = tomsk.toTimeString().slice(0, 8);
}

/* init */
document.addEventListener('DOMContentLoaded', () => {
  refreshAll();
  updateClock();
  setInterval(updateClock, 1000);
});

window.refreshAll = refreshAll;
