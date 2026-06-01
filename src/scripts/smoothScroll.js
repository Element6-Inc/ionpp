// smoothScroll.js — Smooth scrolling for in-page anchor links.
//
// Re-runs on every astro:page-load so newly rendered anchor links
// (in the swapped DOM) are wired up correctly after each navigation.
//
// The hash scroll also runs on each page-load, which correctly handles
// the case where ClientRouter navigates to a URL that includes a hash
// (e.g. clicking "About#team" from another page).

function initSmoothScroll() {
  // If the URL has a hash on arrival, scroll to that element.
  if (window.location.hash) {
    const target = document.getElementById(window.location.hash.substring(1));
    if (target) {
      // Small delay lets the page finish rendering before scrolling.
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  // Wire up all anchor links on the current page.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, null, `#${targetId}`);
      }
      // If target isn't on this page, let the browser navigate normally.
    });
  });
}

document.addEventListener("astro:page-load", initSmoothScroll);