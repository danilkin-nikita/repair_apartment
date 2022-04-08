"use strict";

const toggleHeaderStyle = () => {
  const header = document.querySelector(".header");

  const checkPageYOffset = () => {
    if (pageYOffset > 0) {
      header.classList.add("header--fixed");
    } else if (pageYOffset === 0) {
      header.classList.remove("header--fixed");
    }
  };

  checkPageYOffset();

  window.addEventListener("scroll", function () {
    checkPageYOffset();
  });
};

toggleHeaderStyle();

const heroSlider = new Swiper(".hero-slider", {
  slideClass: "hero-slide",
  wrapperClass: "hero-slider__wrapper",
  loop: true,
  effect: "fade",
  pagination: {
    el: ".hero-slider__pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "0" + (index + 1) + "</span>";
    },
  },
  navigation: {
    nextEl: ".hero-slider__button-next",
    prevEl: ".hero-slider__button-prev",
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
});
