(() => {
  "use strict";

  const config = window.AIRWAVES_SITE;
  const currentPage = document.body.dataset.page || "home";
  const detailMenuPage = currentPage === "detail" ? new URLSearchParams(location.search).get("type") : null;
  const collections = { news: config.news, media: config.media, releases: config.releases, about: config.members };
  const collectionLabels = { news: "NEWS", media: "MEDIA", releases: "RELEASES", about: "ABOUT US" };
  const cardActions = { news: "READ", media: "VIEW", releases: "LISTEN", about: "MEET" };
  const access = {
    sessionKey: "aw-backstage-access-v1",
    salt: "aw-gate-v1-7f2c91",
    iterations: 210000,
    expected: "c82ee86b123fd04cccdb8164b286809724c5f252968876244dbfddffcb57383c",
  };
  const introKey = "aw-intro-seen-v1";
  const isProtectedPage = document.body.dataset.protected === "true";

  const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));

  function injectShell() {
    let showIntro = currentPage === "home";
    if (showIntro) { try { showIntro = localStorage.getItem(introKey) !== "yes"; } catch (_) { /* storage may be disabled */ } }
    document.body.insertAdjacentHTML("afterbegin", `
      ${showIntro ? '<div class="page-loader" id="page-loader" aria-hidden="true"><div class="loader-noise" aria-hidden="true"></div><div class="loader-logo"><span>AIR</span><span>WAVES</span></div><div class="loader-track"><span></span></div><div class="loader-count">TURN IT UP / <b id="loader-percent">0%</b></div></div>' : ''}
      <div class="custom-cursor" id="custom-cursor" aria-hidden="true"><span></span></div><div class="grain" aria-hidden="true"></div>`);
    if (!showIntro) document.body.classList.remove("is-loading");

    const header = document.querySelector("#site-header");
    header.innerHTML = `
      <header class="site-header full-header">
        <button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu"><span></span><span></span><b>MENU</b></button>
        <a class="brand centered-brand" href="index.html" aria-label="Airwaves home"><span class="brand-mark"><img src="AIRWAVES_FULL_SVG.svg" alt="" /></span><span class="brand-name">AIRWAVES</span></a>
        <a class="header-next" href="next-show.html"><span class="live-dot"></span>NEXT SHOW</a>
      </header>
      <nav class="site-menu" id="site-menu" aria-label="Main navigation">
        <div class="menu-art" aria-hidden="true"><img src="AIRWAVES_FULL_SVG.svg" alt="" /></div>
        <div class="menu-links">${config.navigation.map((item, index) => `
          <a href="${escapeHTML(item.path)}" class="${item.page === currentPage || item.page === detailMenuPage || (["next-set", "studio"].includes(currentPage) && item.page === "backstage") ? "active" : ""}"><span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHTML(item.label)}</b><i>↗</i></a>`).join("")}
          <button class="lock-site" id="lock-site" type="button">LOCK BACKSTAGE PASS</button>
        </div><div class="menu-meta">AIRWAVES / OFFICIAL SITE / TAIPEI</div>
      </nav>
      <div class="motion-ticker" aria-hidden="true"><div class="ticker-track"><span>AIRWAVES ONLINE</span><i>✦</i><span>TURN IT UP</span><i>✦</i><span>NO DEAD AIR</span><i>✦</i><span>MAKE IT LOUD</span><i>✦</i><span>AIRWAVES ONLINE</span><i>✦</i><span>TURN IT UP</span><i>✦</i><span>NO DEAD AIR</span><i>✦</i><span>MAKE IT LOUD</span><i>✦</i></div></div>`;

    const footer = document.querySelector("#site-footer");
    footer.innerHTML = `<footer><div class="footer-brand">AIRWAVES</div><div class="footer-credit">WE ARE &amp; AIRWAVES</div><div>© ${new Date().getFullYear()} / OFFICIAL SITE</div></footer>`;
  }

  function detailUrl(type, slug) {
    return `detail.html?type=${encodeURIComponent(type)}&slug=${encodeURIComponent(slug)}`;
  }

  function cardArtwork(item, type) {
    const art = item.image
      ? `<img class="card-image" src="${escapeHTML(item.image)}" alt="" />`
      : `<img class="card-logo-ghost" src="AIRWAVES_FULL_SVG.svg" alt="" /><b>${escapeHTML(item.title.split(/\s+/)[0])}</b>`;
    return `<div class="card-art card-art-${escapeHTML(item.accent || "acid")}" aria-hidden="true">${art}<span>${escapeHTML(type)}</span></div>`;
  }

  function makeCard(item, type, index) {
    return `<a class="content-card physics-card" href="${detailUrl(type, item.slug)}" style="--card-delay:${index * 70}ms">
      <i class="cursor-corner" aria-hidden="true"></i>${cardArtwork(item, type)}
      <div class="card-copy"><div class="card-meta"><span>${escapeHTML(item.eyebrow)}</span><time>${escapeHTML(item.date || String(index + 1).padStart(2, "0"))}</time></div>
      <h2>${escapeHTML(item.title)}</h2><p>${escapeHTML(item.summary)}</p><b class="card-arrow">${cardActions[type]} <span>↗</span></b></div></a>`;
  }

  function renderCards(targetId, items, type) {
    const target = document.querySelector(`#${targetId}`);
    if (target) target.innerHTML = items.map((item, index) => makeCard(item, type, index)).join("");
  }

  function renderPageContent() {
    const intro = document.querySelector("#home-intro");
    if (intro) intro.textContent = config.intro;
    const about = document.querySelector("#about-intro");
    if (about) about.textContent = config.about;
    renderCards("home-latest-grid", config.news.slice(0, 3), "news");
    renderCards("news-grid", config.news, "news");
    renderCards("media-grid", config.media, "media");
    renderCards("releases-grid", config.releases, "releases");
    renderCards("members-grid", config.members, "about");
    renderNextShow();
    renderDetail();
  }

  function renderNextShow() {
    const show = config.nextShow;
    const target = document.querySelector("#next-show-content");
    if (target) {
      const tickets = show.ticketUrl && show.ticketUrl !== "#"
        ? `<a href="${escapeHTML(show.ticketUrl)}" target="_blank" rel="noopener">GET TICKETS <span>↗</span></a>`
        : `<span class="show-action-disabled">TICKETS TBA</span>`;
      target.innerHTML = `<div class="show-poster"><div class="show-number">05</div><div class="show-kicker">NEXT SHOW / AIRWAVES LIVE</div>
        <h1 id="show-title">${escapeHTML(show.venue)}<span>.</span></h1><div class="show-info"><strong>${escapeHTML(show.date)}</strong><span>${escapeHTML(show.city)}</span><span>${escapeHTML(show.doors)}</span></div>
        <div class="show-lineup">${(show.lineup || []).map((band, index) => `<span><i>${String(index + 1).padStart(2, "0")}</i>${escapeHTML(band)}</span>`).join("")}</div>
        <p>${escapeHTML(show.note)}</p><div class="show-actions">${tickets}<a href="backstage.html">OPEN BACKSTAGE <span>→</span></a></div><img src="AIRWAVES_FULL_SVG.svg" alt="" aria-hidden="true" /></div>`;
    }
    const homeBand = document.querySelector("#home-show-band");
    if (homeBand) homeBand.innerHTML = `<div><span>NEXT SHOW / ${escapeHTML(show.date)}</span><h2>${escapeHTML(show.venue)}</h2><p>${escapeHTML(show.city)} · ${escapeHTML(show.doors)}</p></div><a href="next-show.html">SHOW DETAILS <b>→</b></a>`;
  }

  function renderMediaStage(item) {
    if (item.youtubeId) {
      return `<div class="detail-media-stage"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.youtubeId)}" title="${escapeHTML(item.title)}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    }
    if (item.video) return `<div class="detail-media-stage"><video src="${escapeHTML(item.video)}" controls playsinline></video></div>`;
    return "";
  }

  function renderDetail() {
    const target = document.querySelector("#detail-page");
    if (!target) return;
    const params = new URLSearchParams(location.search);
    const type = params.get("type") || "news";
    const slug = params.get("slug") || "";
    const item = collections[type]?.find((entry) => entry.slug === slug);
    if (!item) {
      target.innerHTML = `<div class="not-found-page"><strong>404</strong><h1>WRONG<br />STAGE.</h1><a href="index.html">← BACK HOME</a></div>`;
      return;
    }
    document.title = `${item.title} — Airwaves`;
    const tracks = item.tracks?.length ? `<ol class="detail-tracks">${item.tracks.map((track, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span>${escapeHTML(track)}</li>`).join("")}</ol>` : "";
    const externalUrl = item.listenUrl || item.link;
    target.innerHTML = `<article class="detail-shell"><a class="detail-back" href="${type === "about" ? "about.html" : `${type}.html`}">← BACK TO ${collectionLabels[type]}</a>
      ${type === "media" ? renderMediaStage(item) : ""}<div class="detail-layout">
      <div class="detail-art detail-art-${escapeHTML(item.accent || "acid")}">${item.image ? `<img src="${escapeHTML(item.image)}" alt="" />` : `<img src="AIRWAVES_FULL_SVG.svg" alt="" /><b>${escapeHTML(item.title.split(/\s+/)[0])}</b>`}</div>
      <div class="detail-copy"><div class="detail-meta"><span>${escapeHTML(item.eyebrow)}</span><time>${escapeHTML(item.date || "AIRWAVES")}</time></div><h1>${escapeHTML(item.title)}</h1>
      <p class="detail-summary">${escapeHTML(item.summary)}</p><div class="detail-body">${(item.body || []).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}</div>${tracks}
      ${externalUrl ? `<a class="detail-action" href="${escapeHTML(externalUrl)}" ${externalUrl.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${type === "releases" ? "LISTEN NOW" : "OPEN MEDIA"} <span>↗</span></a>` : ""}</div></div></article>`;
  }

  function attachCardPhysics() {
    document.querySelectorAll(".physics-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--card-rx", `${(0.5 - y) * 4}deg`);
        card.style.setProperty("--card-ry", `${(x - 0.5) * 5}deg`);
        card.style.setProperty("--corner-x", x < 0.5 ? "0%" : "100%");
        card.style.setProperty("--corner-y", y < 0.5 ? "0%" : "100%");
        card.style.setProperty("--corner-rotate", `${(x >= 0.5 ? 1 : 0) * 90 + (y >= 0.5 ? 1 : 0) * 180}deg`);
        card.style.setProperty("--glow-x", `${x * 100}%`);
        card.style.setProperty("--glow-y", `${y * 100}%`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("--card-rx");
        card.style.removeProperty("--card-ry");
      });
    });
  }

  async function deriveAccessKey(value) {
    const encoder = new TextEncoder();
    const material = await crypto.subtle.importKey("raw", encoder.encode(value), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: encoder.encode(access.salt), iterations: access.iterations, hash: "SHA-256" }, material, 256);
    return [...new Uint8Array(bits)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function setupProtectedGate() {
    if (!isProtectedPage) return;
    let gate = document.querySelector("#password-gate");
    if (!gate) {
      document.body.insertAdjacentHTML("afterbegin", '<div class="password-gate" id="password-gate" hidden></div>');
      gate = document.querySelector("#password-gate");
    }
    gate.innerHTML = `<div class="gate-noise" aria-hidden="true"></div><form class="gate-card" id="password-form">
      <div class="gate-logo-wrap"><img src="AIRWAVES_FULL_SVG.svg" alt="Airwaves"></div>
      <button class="gate-close" id="gate-close" type="button">← BACK TO SITE</button>
      <div class="gate-kicker">PRIVATE AREA / BACKSTAGE PASS</div><h1>CREW<br><span>ONLY.</span></h1>
      <p>Enter the Airwaves crew password to open the set tools and Studio.</p>
      <label for="site-password">PASSWORD</label><div class="gate-input-row"><input id="site-password" type="password" autocomplete="current-password" required autofocus><button type="button" id="toggle-password" aria-label="Show password">SHOW</button></div>
      <button class="gate-submit" type="submit"><span>OPEN BACKSTAGE</span><b>↗</b></button><div class="gate-error" id="gate-error" role="alert" aria-live="polite"></div>
      </form><div class="gate-footer">AUTHORIZED PERSONNEL / ${new Date().getFullYear()}</div>`;
    const granted = sessionStorage.getItem(access.sessionKey) === "granted";
    gate.hidden = granted;
    document.body.classList.toggle("site-locked", !granted);
    const form = document.querySelector("#password-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const input = document.querySelector("#site-password");
      const submit = form.querySelector(".gate-submit");
      const error = document.querySelector("#gate-error");
      error.textContent = "";
      submit.disabled = true;
      submit.querySelector("span").textContent = "CHECKING";
      try {
        if (await deriveAccessKey(input.value) !== access.expected) throw new Error("denied");
        sessionStorage.setItem(access.sessionKey, "granted");
        document.body.classList.remove("site-locked");
        gate.classList.add("unlocked");
        setTimeout(() => { gate.hidden = true; }, 650);
      } catch (_) {
        form.classList.remove("denied");
        void form.offsetWidth;
        form.classList.add("denied");
        error.textContent = "ACCESS DENIED — TRY AGAIN";
        input.select();
      } finally {
        submit.disabled = false;
        submit.querySelector("span").textContent = "OPEN BACKSTAGE";
      }
    });
    document.querySelector("#toggle-password").addEventListener("click", (event) => {
      const input = document.querySelector("#site-password");
      const showing = input.type === "text";
      input.type = showing ? "password" : "text";
      event.currentTarget.textContent = showing ? "SHOW" : "HIDE";
    });
    document.querySelector("#gate-close").addEventListener("click", () => { location.href = "index.html"; });
  }

  function setupInteractions() {
    const toggle = document.querySelector("#menu-toggle");
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelector("#lock-site").addEventListener("click", () => {
      sessionStorage.removeItem(access.sessionKey);
      document.body.classList.remove("menu-open");
      if (isProtectedPage) location.reload();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") document.body.classList.remove("menu-open");
    });
    const contact = document.querySelector("#contact-form");
    if (contact) contact.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(contact);
      const subject = `[Airwaves ${data.get("subject")}] from ${data.get("name")}`;
      const body = `${data.get("message")}\n\nFrom: ${data.get("name")} <${data.get("email")}>`;
      location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  function startMotionSystem() {
    const loader = document.querySelector("#page-loader");
    const LOADER_MS = 1300;
    if (loader) {
      const percent = loader.querySelector("#loader-percent");
      const startedAt = performance.now();
      const tickPercent = (now) => {
        const value = Math.min(100, Math.round(((now - startedAt) / LOADER_MS) * 100));
        if (percent) percent.textContent = `${value}%`;
        if (value < 100) requestAnimationFrame(tickPercent);
      };
      requestAnimationFrame(tickPercent);
    }
    setTimeout(() => {
      if (loader) {
        loader.classList.add("done");
        try { localStorage.setItem(introKey, "yes"); } catch (_) { /* storage may be disabled */ }
      }
      document.body.classList.remove("is-loading");
      document.body.classList.add("motion-ready");
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }), { threshold: 0.1 });
      document.querySelectorAll(".reveal-item").forEach((item) => observer.observe(item));
    }, loader ? LOADER_MS : 0);

    const hero = document.querySelector(".hero");
    if (hero) hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(2));
      hero.style.setProperty("--my", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(2));
    });
    const cursor = document.querySelector("#custom-cursor");
    window.addEventListener("pointermove", (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add("visible");
    });
    document.addEventListener("pointerover", (event) => cursor.classList.toggle("hovering", Boolean(event.target.closest("button, a, input, textarea, [contenteditable]"))));
    document.documentElement.addEventListener("mouseleave", () => cursor.classList.remove("visible"));
  }

  injectShell();
  renderPageContent();
  attachCardPhysics();
  setupProtectedGate();
  setupInteractions();
  startMotionSystem();
})();
