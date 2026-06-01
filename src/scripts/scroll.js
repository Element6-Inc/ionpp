// scroll.js — Scroll-to-top button.
//
// The window scroll listener is explicitly removed on astro:before-swap.
// Without this, each navigation would stack another listener on window
// (since window persists across ClientRouter navigations), and you'd end
// up with N listeners after N page visits — all fighting each other.

let toggleScrollBtn = null;

function initScrollToTop() {
  const btn = document.getElementById("scrollToTopBtn");
  if (!btn) return;

  // Remove any previous listener before adding a new one.
  if (toggleScrollBtn) {
    window.removeEventListener("scroll", toggleScrollBtn);
  }

  toggleScrollBtn = () => {
    if (window.scrollY > 300) {
      btn.classList.replace("opacity-0", "opacity-100");
    } else {
      btn.classList.replace("opacity-100", "opacity-0");
    }
  };

  window.addEventListener("scroll", toggleScrollBtn);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Run once immediately to set the correct initial state.
  toggleScrollBtn();
}

// Remove the scroll listener before the DOM swaps out.
document.addEventListener("astro:before-swap", () => {
  if (toggleScrollBtn) {
    window.removeEventListener("scroll", toggleScrollBtn);
    toggleScrollBtn = null;
  }
});

document.addEventListener("astro:page-load", initScrollToTop);