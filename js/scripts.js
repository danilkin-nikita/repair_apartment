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

const tabs = () => {
  const tabHeader = document.querySelector(".price-tabs"),
    tab = [...tabHeader.querySelectorAll(".price-tab")],
    tabContent = document.querySelectorAll(".price-table");

  const toggleTabContent = (index) => {
    for (let i = 0; i < tabContent.length; i++) {
      if (index === i) {
        tab[i].classList.add("price-tab--active");
        tabContent[i].classList.add("price-table--active");
      } else {
        tab[i].classList.remove("price-tab--active");
        tabContent[i].classList.remove("price-table--active");
      }
    }
  };

  tabHeader.addEventListener("click", (event) => {
    let target = event.target;
    target = target.closest(".price-tab");

    toggleTabContent(tab.indexOf(target));
  });
};

if (document.querySelector(".price-tabs")) {
  tabs();
}
