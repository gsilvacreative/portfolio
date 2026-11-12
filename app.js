(() => {
  "use strict";

  const bootScreen = document.querySelector("#bootScreen");
  const desktop = document.querySelector("#desktop");
  const startButton = document.querySelector("#startButton");
  const startMenuButton = document.querySelector("#startMenuButton");
  const startMenu = document.querySelector("#startMenu");
  const windowLayer = document.querySelector("#windowLayer");
  const taskbarApps = document.querySelector("#taskbarApps");
  const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const openWindows = new Map();
  let zIndex = 10;

  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    document.querySelector("#topClock").textContent = time;
    document.querySelector("#taskClock").textContent = time;
  }
  updateClock();
  setInterval(updateClock, 30000);

  startButton.addEventListener("click", () => {
    bootScreen.classList.add("hidden");
    desktop.classList.remove("hidden");
    openWindow("projects");
  });

  startMenuButton.addEventListener("click", () => startMenu.classList.toggle("hidden"));

  document.querySelectorAll("[data-open]").forEach(button => {
    button.addEventListener("click", () => {
      startMenu.classList.add("hidden");
      openWindow(button.dataset.open);
    });
  });

  function projectCover(project, compact = false) {
    if (project.coverImage) {
      return `<div class="game-cover ${escapeHTML(project.coverClass || "")}"><span class="game-label">${escapeHTML(project.category)}</span><img src="${escapeHTML(project.coverImage)}" alt="${escapeHTML(project.title)} cover image" loading="lazy"></div>`;
    }
    const visual = project.coverClass === "cover-halloween"
      ? '<i class="cover-orb"></i><i class="cover-ghost"></i>'
      : project.coverClass === "cover-christmas"
      ? '<i class="cover-tree"></i><i class="cover-star">✦</i>'
      : project.coverClass === "cover-campaign"
      ? '<i class="cover-shape"></i>'
      : '<i class="cover-grid"></i>';
    return `<div class="game-cover ${escapeHTML(project.coverClass || "cover-identity")}"><span class="game-label">${escapeHTML(project.category)}</span>${visual}<span class="cover-title">${project.coverWords || escapeHTML(project.title)}</span></div>`;
  }

  function projectsContent() {
    const cards = projects.map(project => `
      <button class="game-card" type="button" data-project="${escapeHTML(project.id)}" aria-label="Open ${escapeHTML(project.title)} case study">
        ${projectCover(project)}
        <span class="game-meta">
          <span><strong>${escapeHTML(project.title)}</strong><small>${escapeHTML(project.category)}</small></span>
          <span class="game-level">${escapeHTML(project.level || "PLAY")}</span>
        </span>
      </button>`).join("");
    return `
      <div class="window-heading">
        <div><p class="section-kicker">FOLDER / 001 — GAME LIBRARY</p><h2>SELECT YOUR<br>EXPERIENCE_</h2></div>
        <p>Every project is a new level. Choose a cartridge to explore the work.</p>
      </div>
      <div class="library-toolbar"><span><strong>${String(projects.length).padStart(2,"0")}</strong> CARTRIDGES FOUND</span><span>MODE: CREATIVE</span><span>▼ OPEN</span></div>
      <div class="game-grid">${cards || '<p class="empty-project-note">No projects added yet. Edit projects.js to add your first game cartridge.</p>'}</div>
      <div class="library-footer"><span>PLAYER 01 / PROJECT SELECT</span><span>PRESS A PROJECT TO CONTINUE ▶</span></div>`;
  }

  function projectContent(project) {
    const cover = project.coverImage
      ? `<div class="case-cover"><img src="${escapeHTML(project.coverImage)}" alt="${escapeHTML(project.title)} cover"></div>`
      : `<div class="case-cover ${escapeHTML(project.coverClass || "")}">${project.coverClass === "cover-halloween" ? '<i class="cover-orb"></i><i class="cover-ghost"></i>' : project.coverClass === "cover-christmas" ? '<i class="cover-tree"></i><i class="cover-star">✦</i>' : project.coverClass === "cover-campaign" ? '<i class="cover-shape"></i>' : '<i class="cover-grid"></i>'}<span class="case-cover-art">${project.coverWords || escapeHTML(project.title)}</span></div>`;
    const palette = (project.palette || []).map(color => `<span class="palette-chip" title="${escapeHTML(color)}" style="background:${escapeHTML(color)}"></span>`).join("");
    const gallery = (project.gallery || []).length
      ? project.gallery.map((src, index) => `<div class="gallery-item"><img src="${escapeHTML(src)}" alt="${escapeHTML(project.title)} project image ${index + 1}" loading="lazy"></div>`).join("")
      : [1,2].map(n => `<div class="gallery-item"><div class="empty-media"><span class="empty-media-icon">▧</span><span class="empty-media-label">ARTWORK SLOT 0${n}</span><small>Add an image path in projects.js</small></div></div>`).join("");

    return `
      <div class="case-top">
        ${cover}
        <div class="case-summary">
          <div><p class="section-kicker">${escapeHTML(project.level || "PROJECT")} / ${escapeHTML(project.category)}</p><h2>${escapeHTML(project.title)}</h2><p>${escapeHTML(project.shortDescription || "")}</p></div>
          <div class="case-facts">
            <div class="case-fact"><span class="case-label">YEAR</span><strong>${escapeHTML(project.year || "—")}</strong></div>
            <div class="case-fact"><span class="case-label">FORMAT</span><strong>${escapeHTML(project.platform || "—")}</strong></div>
          </div>
        </div>
      </div>
      <div class="case-copy-grid">
        <section class="case-copy"><h3>01 / THE BRIEF</h3><p>${escapeHTML(project.brief || "")}</p></section>
        <section class="case-copy"><h3>02 / CREATIVE APPROACH</h3><p>${escapeHTML(project.approach || "")}</p></section>
        <section class="case-copy"><h3>03 / MY ROLE</h3><p>${escapeHTML(project.contribution || "")}</p></section>
        <section class="case-copy"><h3>04 / DELIVERABLES</h3><p>${escapeHTML(project.deliverables || "")}</p><div class="palette-row">${palette}</div></section>
      </div>
      <section class="case-gallery">
        <div class="case-gallery-head"><h3>VISUAL ARCHIVE / ARTWORK</h3><span>${String((project.gallery || []).length || 2).padStart(2,"0")} FILES</span></div>
        <div class="gallery-grid">${gallery}</div>
      </section>
      <div class="case-footer"><span>END OF LEVEL / ${escapeHTML(project.year || "")}</span><span>PLAYER 01 — PORTFOLIO</span></div>`;
  }

  function contentFor(type, data) {
    if (type === "projects") return projectsContent();
    if (type === "project") return projectContent(data);
    if (type === "about") return `
      <div class="window-heading"><div><p class="section-kicker">PLAYER PROFILE / 001</p><h2>HELLO,<br>I'M YOUR NAME.</h2></div><p>Creative thinker. Visual problem solver. Collector of good ideas.</p></div>
      <div class="about-layout">
        <div class="about-avatar"><div class="avatar-pixel"></div></div>
        <div class="about-text"><h2>GRAPHIC DESIGNER<br>BASED IN PORTUGAL</h2><p>I'm a graphic designer interested in visual storytelling, thoughtful typography and meaningful communication. I work across campaigns, identities, print and digital design, taking projects from the first idea to their final applications.</p><p>Replace this introduction with your own story, experience and the kind of projects you want to work on.</p></div>
      </div>
      <div class="about-stats">
        <div class="about-stat"><strong>03+</strong><span class="about-stat-label">YEARS EXPLORING</span></div>
        <div class="about-stat"><strong>∞</strong><span class="about-stat-label">IDEAS TO TEST</span></div>
        <div class="about-stat"><strong>PT</strong><span class="about-stat-label">BASED IN PORTUGAL</span></div>
      </div>`;
    if (type === "skills") return `
      <div class="window-heading"><div><p class="section-kicker">INVENTORY / PLAYER STATS</p><h2>SKILL TREE_</h2></div><p>Tools, disciplines and creative abilities collected along the way.</p></div>
      <div class="skill-groups">
        <section class="skill-group"><h3>DESIGN DISCIPLINES</h3><div class="skill-list"><span class="skill-tag">Visual identity</span><span class="skill-tag">Campaign design</span><span class="skill-tag">Art direction</span><span class="skill-tag">Editorial</span><span class="skill-tag">Print production</span><span class="skill-tag">Digital design</span><span class="skill-tag">Typography</span><span class="skill-tag">Layout</span></div></section>
        <section class="skill-group"><h3>SOFTWARE INVENTORY</h3><div class="skill-list"><span class="skill-tag">Adobe InDesign</span><span class="skill-tag">Adobe Illustrator</span><span class="skill-tag">Adobe Photoshop</span><span class="skill-tag">Figma</span><span class="skill-tag">HTML / CSS</span></div></section>
      </div>
      <div class="skill-bars">
        <div class="skill-bar-row"><span>DESIGN</span><span class="skill-bar"><i style="width:88%"></i></span></div>
        <div class="skill-bar-row"><span>TYPOGRAPHY</span><span class="skill-bar"><i style="width:82%"></i></span></div>
        <div class="skill-bar-row"><span>PRINT</span><span class="skill-bar"><i style="width:85%"></i></span></div>
        <div class="skill-bar-row"><span>WEB</span><span class="skill-bar"><i style="width:38%"></i></span></div>
      </div>
      <p class="readme-copy">Edit this window in <strong>app.js</strong> to reflect your actual skills and proficiency. The bars are illustrative, not an assessment.</p>`;
    if (type === "contact") return `
      <div class="window-heading"><div><p class="section-kicker">COMMUNICATION PORTAL / 003</p><h2>LET'S CONNECT_</h2></div><p>Have a project, opportunity or good idea? Send it this way.</p></div>
      <div class="contact-panel">
        <div class="contact-big"><p>NEW QUEST AVAILABLE?</p><h2>LET'S MAKE<br>IT HAPPEN.</h2><p>Portugal · Available worldwide</p></div>
        <div class="contact-details">
          <a href="mailto:your.email@example.com">✉ &nbsp; YOUR.EMAIL@EXAMPLE.COM</a>
          <a href="https://www.behance.net/" target="_blank" rel="noreferrer">▣ &nbsp; BEHANCE PROFILE ↗</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">in &nbsp; LINKEDIN PROFILE ↗</a>
          <span>UPDATE THESE LINKS IN app.js WITH YOUR DETAILS.</span>
        </div>
      </div>`;
    if (type === "credits") return `
      <div class="readme-copy">
        <p class="section-kicker">SYSTEM FILE / README.TXT</p><h2>WELCOME TO MY PORTFOLIO.</h2>
        <p>This desktop is a playful way to explore my graphic design work. Open the project library, choose a game cartridge and explore each case study.</p>
        <p><strong>HOW TO PLAY</strong></p><ul><li>Open desktop icons to explore different folders.</li><li>Choose a project to open its case study.</li><li>Use the window controls to minimise, maximise or close windows.</li><li>Use the taskbar to return to an open window.</li></ul>
        <p><strong>ABOUT THIS BUILD</strong></p><p>Original retro desktop-inspired interface built with HTML, CSS and JavaScript. Not affiliated with or copied from a commercial operating system or game.</p>
        <p><strong>PLAYER 01 — THANKS FOR VISITING.</strong></p>
      </div>`;
    return `<p class="empty-project-note">This folder is empty.</p>`;
  }

  const windowTitles = {
    projects: "MY PROJECTS — GAME LIBRARY",
    about: "ABOUT ME — PLAYER PROFILE",
    skills: "SKILL TREE — INVENTORY",
    contact: "CONTACT.EXE — MESSAGE PORTAL",
    credits: "READ_ME.TXT — SYSTEM FILE",
    project: "PROJECT CASE STUDY"
  };

  function focusWindow(id) {
    const record = openWindows.get(id);
    if (!record) return;
    if (record.element.classList.contains("minimised")) {
      record.element.classList.remove("minimised");
      record.element.style.display = "flex";
    }
    record.element.style.zIndex = String(++zIndex);
    document.querySelectorAll(".taskbar-app").forEach(button => button.classList.toggle("active", button.dataset.windowId === id));
  }

  function updateTaskbar() {
    taskbarApps.innerHTML = "";
    openWindows.forEach((record, id) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "taskbar-app" + (record.element.style.display !== "none" ? " active" : "");
      button.dataset.windowId = id;
      button.textContent = record.title;
      button.addEventListener("click", () => focusWindow(id));
      taskbarApps.appendChild(button);
    });
  }

  function makeDraggable(element, handle) {
    let startX = 0, startY = 0, originX = 0, originY = 0, dragging = false;
    handle.addEventListener("pointerdown", event => {
      if (event.target.closest("button") || element.classList.contains("maximized") || window.matchMedia("(max-width: 760px)").matches) return;
      dragging = true;
      const rect = element.getBoundingClientRect();
      startX = event.clientX; startY = event.clientY; originX = rect.left; originY = rect.top;
      element.style.transform = "none";
      element.style.left = `${rect.left - element.parentElement.getBoundingClientRect().left}px`;
      element.style.top = `${rect.top - element.parentElement.getBoundingClientRect().top}px`;
      handle.setPointerCapture(event.pointerId);
      focusWindow(element.dataset.windowId);
    });
    handle.addEventListener("pointermove", event => {
      if (!dragging) return;
      const parent = element.parentElement.getBoundingClientRect();
      const width = element.offsetWidth, height = element.offsetHeight;
      const left = Math.min(Math.max(0, originX + event.clientX - startX - parent.left), Math.max(0, parent.width - Math.min(width, 180)));
      const top = Math.min(Math.max(0, originY + event.clientY - startY - parent.top), Math.max(0, parent.height - 80));
      element.style.left = `${left}px`; element.style.top = `${top}px`;
    });
    const stop = () => { dragging = false; };
    handle.addEventListener("pointerup", stop);
    handle.addEventListener("pointercancel", stop);
  }

  function openWindow(type, data = null) {
    const id = type === "project" ? `project-${data.id}` : type;
    if (openWindows.has(id)) { focusWindow(id); return; }
    const title = type === "project" ? `${data.title} — CASE FILE` : (windowTitles[type] || "PORTFOLIO WINDOW");
    const windowEl = document.createElement("section");
    windowEl.className = "app-window" + (type === "about" || type === "skills" || type === "contact" || type === "credits" ? " small-window" : "");
    windowEl.dataset.windowId = id;
    windowEl.setAttribute("role", "dialog");
    windowEl.setAttribute("aria-label", title);
    windowEl.innerHTML = `
      <div class="window-titlebar">
        <div class="window-title">▣ &nbsp; ${escapeHTML(title)}</div>
        <div class="window-controls">
          <button type="button" data-action="minimise" aria-label="Minimise window">−</button>
          <button type="button" data-action="maximise" aria-label="Maximise window">□</button>
          <button type="button" data-action="close" aria-label="Close window">×</button>
        </div>
      </div>
      <div class="window-content">${contentFor(type, data)}</div>
      <div class="window-status"><span>PIXEL DESKTOP / ${escapeHTML(type.toUpperCase())}</span><span>READY</span></div>`;
    windowLayer.appendChild(windowEl);
    openWindows.set(id, { element: windowEl, title });
    focusWindow(id);
    updateTaskbar();
    makeDraggable(windowEl, windowEl.querySelector(".window-titlebar"));

    windowEl.addEventListener("pointerdown", () => focusWindow(id));
    windowEl.querySelector('[data-action="close"]').addEventListener("click", () => {
      windowEl.remove(); openWindows.delete(id); updateTaskbar();
    });
    windowEl.querySelector('[data-action="minimise"]').addEventListener("click", () => {
      windowEl.classList.add("minimised"); windowEl.style.display = "none"; updateTaskbar();
    });
    windowEl.querySelector('[data-action="maximise"]').addEventListener("click", () => {
      windowEl.classList.toggle("maximized");
      if (!windowEl.classList.contains("maximized")) {
        windowEl.style.left = "50%"; windowEl.style.top = "50%"; windowEl.style.transform = "translate(-50%,-50%)";
      }
      focusWindow(id);
    });
    windowEl.querySelectorAll("[data-project]").forEach(button => {
      button.addEventListener("click", () => {
        const project = projects.find(item => item.id === button.dataset.project);
        if (project) openWindow("project", project);
      });
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      startMenu.classList.add("hidden");
      const visible = [...openWindows.entries()].filter(([,record]) => record.element.style.display !== "none");
      if (visible.length) {
        const [id, record] = visible.sort((a,b) => Number(b[1].element.style.zIndex || 0) - Number(a[1].element.style.zIndex || 0))[0];
        record.element.remove(); openWindows.delete(id); updateTaskbar();
      }
    }
  });
})();
