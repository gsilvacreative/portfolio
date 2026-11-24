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


## Typography
The updated interface uses **Space Grotesk** for headings and interface labels, and **Inter** for body copy. The retro character is retained through the desktop layout, pixel-inspired icon artwork, window controls and scanline treatment rather than hard-to-read display fonts. An internet connection is required to load the Google Fonts; system sans-serif fallbacks are included.


## 6. Add a full-project preview link to a case study

The full-project links are organised in one place near the top of `projects.js`, under the heading **FULL PROJECT LINKS — EDIT THIS SECTION TO ADD/CHANGE FILES**. Each entry uses the project ID as its key.

Example:

```js
"the-wolf": {
  url: "assets/projects/the-wolf-full-project.pdf",
  label: "VIEW FULL PROJECT"
},
```

To add a PDF stored in this repository:
1. Create the folder `assets/projects/` if it does not exist.
2. Add your PDF, using a simple filename such as `the-wolf-full-project.pdf`.
3. Put its relative path in the matching `url` field in `projects.js`.
4. Commit both the PDF and the code change.

You can also paste a direct HTTPS URL to a PDF or a preview page that permits embedding. Leave `url: ""` until a project's file is ready; its button will appear automatically once you add a URL. The button is placed at the end of that project's case study and opens `file-viewer.html` in a new tab.

### About download protection

The custom viewer does not show its own download button and asks supported built-in PDF viewers to hide their toolbar. This is only a convenience, not secure download prevention. Because this is a public static GitHub Pages site, files placed in the repository are publicly accessible by URL. Visitors may still save a PDF, use browser tools, print, or take screenshots. Do not upload confidential originals or material you do not have permission to publish. For stronger access control, use a document-hosting service that supports authenticated viewers and disable download/print permissions there, or publish flattened, reduced-resolution preview copies.
