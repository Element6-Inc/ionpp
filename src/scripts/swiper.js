// swiper.js — Card slider init.
//
// IMPORTANT: This must run on every page view, including SPA navigations
// performed by Astro's <ClientRouter />. The old `DOMContentLoaded` listener
// only fired on a full document load, so coming back to a page via client
// routing left the slider uninitialised (one giant card, no layout).
//
// `astro:page-load` fires on the initial load AND after every client-side
// navigation, so it's the correct hook. We also keep a reference to the live
// Swiper instance and destroy it before re-creating, which prevents duplicate
// instances and stacked event listeners when a page is revisited.

let cardSwiper = null;

function initCardSlider() {
  const el = document.querySelector(".swiper");

  // No slider on this page — nothing to do.
  if (!el) {
    cardSwiper = null;
    return;
  }

  // Swiper must be available (loaded globally from the CDN in the layout head).
  if (typeof Swiper === "undefined") return;

  // Tear down any previous instance before re-initialising.
  if (cardSwiper) {
    cardSwiper.destroy(true, true);
    cardSwiper = null;
  }

  cardSwiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    allowTouchMove: true,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  const dots = document.querySelectorAll(".pagination-dot");
  const slidesPerGroup = 3;
  let currentGroup = 0;

  function updateActiveDot() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentGroup);
    });
  }

  function goToGroup(groupIndex) {
    currentGroup = groupIndex;
    cardSwiper.slideTo(groupIndex * slidesPerGroup);
    updateActiveDot();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToGroup(index));
  });

  cardSwiper.on("slideChange", function () {
    const newGroup = Math.floor(cardSwiper.activeIndex / slidesPerGroup);
    if (newGroup !== currentGroup) {
      currentGroup = newGroup;
      updateActiveDot();
    }
  });

  updateActiveDot();
}

// Clean up before the DOM is swapped out on navigation, so we don't leave a
// Swiper instance bound to a soon-to-be-removed element.
document.addEventListener("astro:before-swap", () => {
  if (cardSwiper) {
    cardSwiper.destroy(true, true);
    cardSwiper = null;
  }
});

// Fires on initial load and after every ClientRouter navigation.
document.addEventListener("astro:page-load", initCardSlider);