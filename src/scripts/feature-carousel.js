// feature-carousel.js — Feature image carousel init.
//
// Mirrors testimonial.js: uses astro:page-load so it re-initialises on
// every client-side navigation, and kills its timer on astro:before-swap.

let timer = null;

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function initFeatureCarousel() {
  const slides = document.querySelectorAll(".inner-svc-carousel__slide");
  const dots   = document.querySelectorAll(".inner-svc-carousel__dot");
  const INTERVAL = 8000;

  // No carousel on this page — nothing to do.
  if (!slides.length || !dots.length) return;

  // Single image — dots hidden, nothing to cycle.
  if (slides.length === 1) return;

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

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goTo(index);
      startTimer();
    });
  });

  // Pause on hover.
  const wrap = slides[0].closest(".inner-svc-carousel__wrap");
  if (wrap) {
    wrap.addEventListener("mouseenter", stopTimer);
    wrap.addEventListener("mouseleave", startTimer);
  }

  // Pause when tab is hidden.
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stopTimer() : startTimer();
  });

  goTo(0);
  startTimer();
}

document.addEventListener("astro:before-swap", stopTimer);
document.addEventListener("astro:page-load", initFeatureCarousel);
