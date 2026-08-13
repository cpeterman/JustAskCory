async function loadPartial(id, file) {
  const host = document.getElementById(id);
  if (!host) return;
  // If the page already has inlined markup, don’t replace it.
  if (host.children && host.children.length > 0) return;

  const res = await fetch(file, { cache: "no-cache" });
  if (!res.ok) return;

  host.innerHTML = await res.text();
}

function currentSectionId() {
  const hash = (location.hash || "").replace("#", "").toLowerCase();
  if (hash === "services" || hash === "how-it-works" || hash === "coming-soon") {
    return hash;
  }
  return "";
}

function setActiveNav() {
  const section = currentSectionId();

  document.querySelectorAll("[data-page]").forEach((a) => {
    if (section && a.getAttribute("data-page") === section) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
}

function initMobileMenu() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  const toggle = () => menu.classList.toggle("hidden");
  btn.addEventListener("click", toggle);

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => menu.classList.add("hidden"));
  });
}

function initHeaderShadow() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const onScroll = () => {
    header.setAttribute("data-scrolled", window.scrollY > 4 ? "true" : "false");
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function ensureManifestLink() {
  // Chrome blocks manifest loads on file://, so only attach on http(s).
  if (location.protocol !== "http:" && location.protocol !== "https:") return;
  if (document.querySelector('link[rel="manifest"]')) return;

  const link = document.createElement("link");
  link.rel = "manifest";
  link.href = "site.webmanifest";
  document.head.appendChild(link);
}

async function initSite() {
  // Partials are kept for compatibility, but pages now inline header/footer
  // so the site works reliably on file:// (Chrome blocks fetch() there).
  await loadPartial("header", "partials/header.html");
  await loadPartial("footer", "partials/footer.html");

  ensureManifestLink();
  setActiveNav();
  initMobileMenu();
  initHeaderShadow();

  window.addEventListener("hashchange", setActiveNav);
}

document.addEventListener("DOMContentLoaded", initSite);
