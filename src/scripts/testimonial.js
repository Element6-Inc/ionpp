// testimonial.js — Testimonial slider init.
//
// Uses astro:page-load instead of DOMContentLoaded so the slider
// re-initialises on every client-side navigation (ClientRouter).
//
// The interval timer is explicitly killed on astro:before-swap so it
// doesn't keep firing against DOM elements that no longer exist after
// a page transition — a leaked setInterval would cause silent errors
// on every tick once the testimonial section is gone.

let timer = null;

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function initTestimonials() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots   = document.querySelectorAll(".testimonial-dot");
  const INTERVAL = 6000;

  // No testimonials on this page — nothing to do.
  if (!slides.length || !dots.length) return;

  // Kill any timer left over from a previous visit before starting fresh.
  stopTimer();

  let current = 0;

  function goTo(index) {
    slides[current].classList.remove("active");
    slides[current].setAttribute("aria-hidden", "true");
    dots[current].classList.remove("active");
    dots[current].setAttribute("aria-current", "false");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("active");
    slides[current].setAttribute("aria-hidden", "false");
    dots[current].classList.add("active");
    dots[current].setAttribute("aria-current", "true");
  }

  function next() { goTo(current + 1); }

  function startTimer() {
    stopTimer();
    timer = setInterval(next, INTERVAL);
  }

  // Dot clicks restart the timer so the user gets a full interval
  // before the next auto-advance.
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goTo(index);
      startTimer();
    });
  });

  // Pause while the user hovers over the section.
  const section = slides[0].closest("section");
  if (section) {
    section.addEventListener("mouseenter", stopTimer);
    section.addEventListener("mouseleave", startTimer);
  }

  // Pause when the tab is hidden, resume when visible.
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopTimer() : startTimer();
  });

  goTo(0);
  startTimer();
}

// Kill the timer before the DOM is swapped — prevents the interval
// from firing against elements that no longer exist.
document.addEventListener("astro:before-swap", stopTimer);

// Fires on initial load and after every ClientRouter navigation.
document.addEventListener("astro:page-load", initTestimonials);