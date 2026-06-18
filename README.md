# 🎂 Birthday Wish Maker

A fully customisable, animated birthday page — built as a pure static site (no backend, no server).

**Customiser (landing page):** https://shiva-prasad-sarkar.github.io/HappyBirthdayy/
**Birthday page example:** https://shiva-prasad-sarkar.github.io/HappyBirthdayy/wish.html

---

## ✨ Features

- 🎨 **6 colour themes** — Purple, Rose, Ocean, Emerald, Gold, Ruby
- 👸🤴 **Gender-aware** — different emojis, falling elements, and cannon particles for Female / Male
- 🤝 **9 relationship types** — Best Friend, Mom, Dad, Girlfriend, Boyfriend, Brother, Sister, Teacher, Other
- 💌 **Wish Helper** — relationship-based writing tips + 3 ready-made message templates
- 🎂 **Interactive cake** — click to trigger a confetti cannon burst
- 🎁 **Scratch card** — hide a surprise link (photo album, playlist, video) under a scratchable overlay
- 🖼️ **Polaroid photo frame** — show a personal photo with a caption
- 🎵 **Background music** — optional MP3 link with play/pause toggle
- 🔢 **Age badge** — "Turning 22 today!" ribbon
- 📅 **Birthday countdown timeline** — animated walker moves towards the birthday date
- 💬 **Daily rotating quotes** — 3 relationship-specific quotes, one per day
- 🌸 **Ambient animations** — falling petals/pearls, floating hearts, mouse sparkle trail, confetti
- 📱 **Mobile-first** — fluid `clamp()` typography, `100dvh`, `env(safe-area-inset-*)`, 48 px+ touch targets
- ⬇️ **Download as ZIP** — pre-fills your config and bundles all files for self-hosting

---

## 🚀 How to use

### Option 1 — Share a link (instant, no download needed)

1. Open the [Customiser](https://shiva-prasad-sarkar.github.io/HappyBirthdayy/customize.html)
2. Fill in the details (name, gender, relationship, message, theme…)
3. Click **Copy Link** → paste into WhatsApp, Instagram DM, or any chat
4. Your friend opens it in their browser — done! 🎉

### Option 2 — Download and host yourself

1. Fill in the Customiser and click **⬇️ Download**
2. Extract the `.zip` — you get `index.html`, `style.css`, `script.js`, `DEPLOY.txt`
3. Host for free using one of the methods below

---

## 🌐 Free hosting options

| Method | Difficulty | Time |
|---|---|---|
| **Netlify drag & drop** | ⭐ Easiest | ~1 min |
| **GitHub Pages** | ⭐⭐ Easy | ~3 min |
| **Open locally** | ⭐ Offline | Instant |

### Netlify (recommended)
1. Go to [netlify.com](https://netlify.com) → create a free account
2. Drag your extracted folder onto the deploy area
3. Share the link Netlify gives you (`your-site.netlify.app`)

### GitHub Pages
1. Create a **Public** repository on [github.com](https://github.com)
2. Upload all 4 files → **Commit changes**
3. **Settings → Pages → Deploy from branch: main → Save**
4. Live at `yourusername.github.io/repo-name/`

### Open locally
- Double-click `index.html` — works fully offline in Chrome / Edge / Firefox
- Screen-record with `Win + G` (Windows) or `⌘ Shift 5` (Mac) and send the video

---

## 🔗 URL parameters

All settings are passed as URL query params so no backend is needed:

| Param | Description | Example |
|---|---|---|
| `to` | Birthday person's name | `Rifat` |
| `from` | Your name | `Shiva` |
| `bday` | Birthday MM-DD | `06-17` |
| `age` | Their age (optional) | `22` |
| `gender` | `female` or `male` | `female` |
| `rel` | Relationship key | `friend` |
| `msg` | Personal message | `You mean the world!` |
| `link` | Surprise link under scratch card | `https://...` |
| `photo` | Photo URL (Imgur etc.) | `https://i.imgur.com/...` |
| `music` | MP3 URL for background music | `https://...` |
| `theme` | `purple` `pink` `blue` `green` `gold` `red` | `pink` |

**Relationship keys:** `friend` `mom` `dad` `gf` `bf` `brother` `sister` `teacher` `other`

---

## 📁 File structure

```
HappyBirthdayy/
├── index.html      — The birthday page (dynamic via URL params or BDAY_CONFIG)
├── customize.html  — The no-code customiser form
├── style.css       — All styles (mobile-first, clamp-based, 6 themes)
└── script.js       — All logic (config, animations, scratch card, timeline…)
```

The `BDAY_CONFIG` block in `index.html` acts as a fallback when no URL params are present — it is automatically replaced when you use the Download feature.

---

## 🛠️ Tech stack

- Vanilla HTML / CSS / JavaScript — zero frameworks, zero build step
- [JSZip](https://stuk.github.io/jszip/) (CDN) — client-side ZIP generation for downloads
- [Google Fonts](https://fonts.google.com/) — Dancing Script + Poppins
- Canvas API — scratch card (`destination-out` composite operation)
- CSS custom properties + `[data-theme]` / `[data-gender]` attributes for theming

---

## 📜 License

MIT — free to use, modify, and share.

---

Made with 💖 by [Shiva Prasad Sarkar](https://github.com/Shiva-Prasad-Sarkar)
