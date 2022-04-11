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

const calc = () => {
  let price = document.querySelector(".price");
  let servicesCounts = [...document.querySelectorAll(".table-input")];
  let servicesCosts = document.querySelectorAll(".table-cost");
  let servicesTotalCost = document.querySelector(".services-total__cost");

  let servicesArr = Array(servicesCosts.length);
  let servicesSum = 0;

  const counting = (index) => {
    for (let i = 0; i < servicesCosts.length; i++) {
      if (index === i) {
        let item = servicesCounts[i].value * servicesCosts[i].value;
        servicesArr.splice(i, 1, item);
      }
    }
    servicesSum = servicesArr.reduce((acc, rec) => acc + rec);
  };

  price.addEventListener("input", (event) => {
    let target = event.target;
    if (target.closest(".table-input")) {
      counting(servicesCounts.indexOf(target));

      const animation = new countUp(
        "totalCost",
        servicesTotalCost.textContent,
        servicesSum,
        0,
        1,
        {
          useEasing: false,
          useGrouping: false,
          separator: ",",
          decimal: ".",
        }
      );
      animation.start();
    }
  });
};

calc();
