# PLAYER ONE — Retro Game Graphic Design Portfolio

A responsive interactive portfolio that feels like a retro desktop operating system and a video-game project library. Built with vanilla HTML, CSS and JavaScript; no build tools or frameworks are required.

## Included files
- `index.html` — boot screen, desktop, desktop icons, taskbar and start menu.
- `styles.css` — retro desktop visuals, pixel-style interface, responsive layout and window styling.
- `app.js` — interactive windows, project launchers, draggable windows, taskbar, start menu and case-study rendering.
- `projects.js` — edit your project names, descriptions, categories, cover images and galleries here.
- `assets/` — place your project images here.

## 1. Preview the site
Extract the ZIP and open `index.html` in Chrome, Edge or Firefox. An internet connection is needed to load the optional Google Fonts; system fallbacks are included.

## 2. Upload to GitHub Pages
1. Create a public GitHub repository named exactly `YOUR-USERNAME.github.io`.
2. Upload the contents of this folder to the repository root (not the ZIP file, and not the enclosing folder).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then Save.
6. After GitHub finishes publishing, visit `https://YOUR-USERNAME.github.io`.

## 3. Personalise the site
### Change your name and contact details
Search `index.html`, `app.js` and `projects.js` for `PLAYER ONE`, `YOUR NAME`, `your.email@example.com`, and update these placeholders. In the About window and contact links, the editable text is in `app.js`.

### Add or change projects
Open `projects.js`. Each project is an object inside `window.PORTFOLIO_PROJECTS`. Edit its:
- `title`, `category`, `year`, `level`, `platform`
- `shortDescription`, `brief`, `approach`, `contribution`, `deliverables`
- `palette` (hex colour values)
- `coverImage` and `gallery`

Keep each `id` unique and use lowercase letters/hyphens, e.g. `summer-campaign`.

### Add images
1. Copy images into `assets/`, for example `assets/halloween-cover.jpg`.
2. In `projects.js`, set `coverImage: "assets/halloween-cover.jpg"`.
3. Add further images using `gallery: ["assets/halloween-poster.jpg", "assets/halloween-social.jpg"]`.
4. The website will display those files automatically when the project is opened.

Recommended web exports: JPG or WebP for photographs/mockups; PNG for graphics needing transparency. Aim for around 1600–2000 px on the long edge and compress for web. Keep filenames simple (lowercase, hyphens, no accents).

## 4. What each desktop icon does
- `MY PROJECTS` — opens the game library. Select a project cartridge to open its case study in another window.
- `ABOUT ME` — opens your profile.
- `SKILL TREE` — opens your creative disciplines and software inventory.
- `CONTACT.EXE` — opens email and social links.
- `READ_ME.TXT` — opens instructions for visitors.

Windows can be dragged on desktop, minimised, maximised and closed. The taskbar lets visitors return to open windows. On touch/mobile layouts, windows are designed to fit the screen and can be operated by tapping.

## 5. Important before publishing
The project descriptions and cover art are starter/demo content. Replace them with accurate descriptions and work you are authorised to share. In particular, get permission before publishing employer or client work, and clearly distinguish personal work, commissioned work and collaborative work. Skill-bar values in the demo are illustrative; edit or remove them to represent your actual skills.

This is an original retro-desktop-inspired interface, not an exact recreation of any commercial operating system or game.
