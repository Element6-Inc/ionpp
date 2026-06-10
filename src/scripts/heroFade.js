// heroFade.js — Fade hero images in only once they've actually loaded.
//
// The fade used to be a CSS animation that started at render time, so on a
// cold cache it finished before the image arrived and the pixels popped in
// abruptly. Here we add .is-loaded on the img's load event instead, and the
// CSS transitions opacity 0 → 1 from that moment.

function initHeroFade() {
  document.querySelectorAll("img.image-zoom").forEach((img) => {
    const reveal = () => {
      // Double-rAF ensures the opacity:0 state is painted first, so the
      // transition always plays — even for already-cached images.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => img.classList.add("is-loaded"))
      );
    };

    if (img.complete && img.naturalWidth > 0) {
      reveal();
    } else {
      img.addEventListener("load", reveal, { once: true });
    }
  });
}

document.addEventListener("astro:page-load", initHeroFade);
