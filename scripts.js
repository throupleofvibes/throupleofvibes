// Throuple of Vibes — simple content-driven JS
// Edit the arrays below to update Videos / Photos / Shows fast.

const videos = [
  {
    title: "Replace me — your newest concert clip",
    meta: "YouTube • 2–6 min • Cali reggae energy",
    thumb: "assets/hero-bg.png", // swap with a real thumbnail later
    watchUrl: "https://youtube.com", // paste your real video URL
  },
  {
    title: "Replace me — backstage / crowd moment",
    meta: "YouTube Short • 30–60s • neon chaos",
    thumb: "assets/hero-bg.png",
    watchUrl: "https://youtube.com",
  },
  {
    title: "Replace me — full song highlight",
    meta: "Live • 3–5 min • the chorus hits DIFFERENT",
    thumb: "assets/hero-bg.png",
    watchUrl: "https://youtube.com",
  },
];

const photos = [
  { src: "assets/hero-bg.png", caption: "Beach stage — pre-show glow." },
  { src: "assets/hero-bg.png", caption: "Lights up, ocean behind. Unreal." },
  { src: "assets/hero-bg.png", caption: "Crowd energy: immaculate." },
  { src: "assets/hero-bg.png", caption: "Add your real photos here anytime." },
  { src: "assets/hero-bg.png", caption: "Pro tip: use 1200px wide JPGs for speed." },
  { src: "assets/hero-bg.png", caption: "Another placeholder — swap me." },
];

const shows = [
  {
    when: "TBD",
    where: "Your city • Your venue",
    who: "Stick Figure (or whoever’s next)",
    notes: "Drop ticket link + meet-up note here.",
    link: "#",
  },
  {
    when: "TBD",
    where: "Your city • Your venue",
    who: "Alt rock / emo night",
    notes: "Add a quick recap or what you’re filming.",
    link: "#",
  },
  {
    when: "TBD",
    where: "Your city • Your venue",
    who: "Country show / festival",
    notes: "Anything goes — if it slaps, it’s on-brand.",
    link: "#",
  },
];

// ---------- UI helpers ----------
const $ = (sel) => document.querySelector(sel);

function mountVideos(){
  const grid = $("#videoGrid");
  grid.innerHTML = "";
  videos.forEach(v => {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <img class="card__media" src="${v.thumb}" alt="" loading="lazy">
      <div class="card__body">
        <div class="card__title">${escapeHtml(v.title)}</div>
        <div class="card__meta">${escapeHtml(v.meta)}</div>
        <div class="card__links">
          <a class="pillLink" href="${v.watchUrl}" target="_blank" rel="noopener">Watch</a>
          <a class="pillLink" href="#submit">Request coverage</a>
        </div>
      </div>
    `;
    grid.appendChild(el);
  });
}

function mountPhotos(){
  const grid = $("#photoGrid");
  grid.innerHTML = "";
  photos.forEach(p => {
    const wrap = document.createElement("figure");
    wrap.className = "photo";
    wrap.tabIndex = 0;
    wrap.setAttribute("role","button");
    wrap.setAttribute("aria-label", `Open photo: ${p.caption}`);
    wrap.innerHTML = `
      <img src="${p.src}" alt="${escapeHtml(p.caption)}" loading="lazy">
      <figcaption class="cap">${escapeHtml(p.caption)}</figcaption>
    `;
    wrap.addEventListener("click", () => openLightbox(p.src, p.caption));
    wrap.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        openLightbox(p.src, p.caption);
      }
    });
    grid.appendChild(wrap);
  });
}

function mountShows(){
  const grid = $("#showGrid");
  grid.innerHTML = "";
  shows.forEach(s => {
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <div class="card__body">
        <div class="card__title">${escapeHtml(s.who)}</div>
        <div class="card__meta">${escapeHtml(s.when)} • ${escapeHtml(s.where)}</div>
        <div class="card__meta" style="margin-top:10px">${escapeHtml(s.notes)}</div>
        <div class="card__links">
          <a class="pillLink" href="${s.link}" target="_blank" rel="noopener">Tickets / info</a>
          <a class="pillLink" href="#submit">Submit an update</a>
        </div>
      </div>
    `;
    grid.appendChild(el);
  });
}

// Lightbox
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
const lightboxCap = $("#lightboxCap");
const lightboxClose = $("#lightboxClose");

function openLightbox(src, caption){
  lightboxImg.src = src;
  lightboxImg.alt = caption;
  lightboxCap.textContent = caption;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox(){
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if(e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if(!lightbox.hidden && e.key === "Escape") closeLightbox();
});

// Mobile menu
const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");

menuBtn.addEventListener("click", () => {
  const open = mobileMenu.hidden === false;
  mobileMenu.hidden = open;
  menuBtn.setAttribute("aria-expanded", String(!open));
});
mobileMenu.addEventListener("click", (e) => {
  if(e.target.matches("a")){
    mobileMenu.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// Topbar elevation
const topbar = document.querySelector(".topbar");
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 18;
  topbar.setAttribute("data-scrolled", scrolled ? "true" : "false");
});

// Demo form — local save
const tipForm = $("#tipForm");
const formStatus = $("#formStatus");
tipForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(tipForm).entries());

  if(!data.artist || !data.venue){
    formStatus.textContent = "Add at least Band/Artist + Venue/City 🙏";
    return;
  }

  const key = "tov_tips";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push({ ...data, at: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(existing));

  formStatus.textContent = "Saved (demo). Tell me where you want tips delivered and I’ll connect it.";
  tipForm.reset();
});

// Simple stat sparkle
$("#year").textContent = new Date().getFullYear();

// Mount content
mountVideos();
mountPhotos();
mountShows();

// Utils
function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}
