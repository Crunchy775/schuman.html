# 🌍 Schumann Resonance Live Monitor

A live Schumann Resonance monitoring website that pulls real data directly from the **Space Observing System at Tomsk State University, Russia** (`sosrff.tsu.ru`).

## Live Data Sources

| Chart | URL |
|-------|-----|
| SR Spectrogram (main) | `http://sosrff.tsu.ru/new/shm.jpg` |
| Magnetometer (7.83 Hz) | `http://sosrff.tsu.ru/new/srf.jpg` |
| Signal Amplitudes | `http://sosrff.tsu.ru/new/sra.jpg` |

Images update every ~15 minutes on the Tomsk server. The site auto-refreshes to match.

---

## How to Deploy on GitHub Pages (step by step)

### Step 1 — Create a GitHub account
Go to [github.com](https://github.com) and sign up if you don't have an account.

### Step 2 — Create a new repository
1. Click the **+** button (top right) → **New repository**
2. Name it exactly: `schumann-resonance` (or anything you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload the files
1. On your new repo page, click **Add file → Upload files**
2. Upload these three files:
   - `index.html`
   - `style.css`
   - `app.js`
3. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repo **Settings** tab
2. Click **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch, **/ (root)** folder
5. Click **Save**

### Step 5 — Your site is live!
After 1–2 minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/schumann-resonance/
```

---

## Features
- ✅ Live Tomsk station data (real, not simulated)
- ✅ Auto-refreshes every 15 minutes
- ✅ Live Tomsk clock (UTC+7)
- ✅ Countdown to next refresh
- ✅ Manual refresh button
- ✅ Error handling if server is down
- ✅ Responsive design (works on mobile)
- ✅ No dependencies — pure HTML, CSS, JS

## Notes
- If images show as blank, the Tomsk server may be temporarily offline — this happens occasionally. The site will show an error message and retry on next refresh.
- The Tomsk server serves the same JPG files continuously, replacing them with new data every ~15 minutes.
- Time is shown in **TLDV (Tomsk Local Daylight Time = UTC+7)**.

## Data Credit
Space Observing System, Tomsk State University of Control Systems and Radioelectronics, Russia.
[sosrff.tsu.ru](http://sosrff.tsu.ru/)
