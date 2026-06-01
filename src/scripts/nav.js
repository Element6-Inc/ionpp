// nav.js — Navigation interactivity (dropdowns + mobile menu).
//
// Lives in src/scripts/ and is imported once from Layout.astro, exactly
// like swiper.js, testimonial.js etc. This is the correct pattern for
// components that use transition:persist — their inline <script> blocks
// only execute once per session (bundled module behaviour), so the
// astro:page-load listener inside them never fires after the first page.
// Loading the script from Layout ensures it re-runs on every navigation.

let activeDropdown = null;
let mobileOpen = false;
let globalsBound = false;
let controller = null;

function setDropdown(id) {
  activeDropdown = id;
  document.querySelectorAll("[data-dropdown-trigger]").forEach((btn) => {
    btn.setAttribute("aria-expanded", String(btn.dataset.dropdownTrigger === id));
  });
  document.querySelectorAll("[data-dropdown-menu]").forEach((menu) => {
    const isActive = menu.dataset.dropdownMenu === id;
    menu.classList.toggle("dropdown-active", isActive);
    menu.classList.toggle("mobile-dropdown-active", isActive);
  });
}

function closeDropdowns() { setDropdown(null); }

function setMobile(open) {
  mobileOpen = open;
  const menu = document.querySelector("[data-mobile-menu]");
  if (!menu) return;
  if (open) {
    menu.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  } else {
    menu.setAttribute("hidden", "");
    document.body.style.overflow = "";
    closeDropdowns();
  }
}

function setupNav() {
  activeDropdown = null;
  mobileOpen = false;
  document.body.style.overflow = "";
  closeDropdowns();

  if (controller) controller.abort();
  controller = new AbortController();
  const { signal } = controller;

  document.querySelectorAll("[data-dropdown-trigger]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const id = btn.dataset.dropdownTrigger ?? null;
      setDropdown(activeDropdown === id ? null : id);
    }, { signal });
  });

  document.querySelectorAll("[data-mobile-open]").forEach((btn) => {
    btn.addEventListener("click", () => setMobile(true), { signal });
  });

  document.querySelectorAll("[data-mobile-close]").forEach((el) => {
    el.addEventListener("click", () => setMobile(false), { signal });
  });

  document.querySelectorAll("[data-mobile-link]").forEach((a) => {
    a.addEventListener("click", () => setMobile(false), { signal });
  });

  if (globalsBound) return;
  globalsBound = true;

  // Close on any navigation start — covers same-URL clicks too.
  document.addEventListener("astro:before-preparation", () => closeDropdowns());

  document.addEventListener("mousedown", (e) => {
    if (activeDropdown === null) return;
    const desktopNav = document.querySelector("[data-desktop-nav]");
    if (!desktopNav) return;
    if (!desktopNav.contains(e.target)) closeDropdowns();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileOpen) setMobile(false);
  });

  window.matchMedia("(min-width: 1024px)").addEventListener("change", (ev) => {
    if (ev.matches && mobileOpen) setMobile(false);
  });
}

document.addEventListener("astro:page-load", setupNav);