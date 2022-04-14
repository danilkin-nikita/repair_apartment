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

const sendForm = () => {
  const error = (elem, cssClass) => {
    elem.classList.add(cssClass);
    setTimeout(() => {
      elem.classList.remove(cssClass);
    }, 6000);
  };

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    let target = event.target;
    const statusMessage = target.querySelector(".status-message"),
      inputName = target.querySelector('input[name="name"]'),
      inputPhone = target.querySelector('input[name="phone"]');

    const validName = /^[а-яА-Яa-zA-Z]{2,}$/,
      validPhone = /^[+\-\)\(0-9 ]+$/;

    let valid = true;

    if (target.matches(".form")) {
      if (inputName) {
        if (!inputName.value.match(validName)) {
          error(inputName, "error-input");
          valid = false;
        }
      }
      if (!inputPhone.value.match(validPhone)) {
        error(inputPhone, "error-input");
        valid = false;
      }
      if (valid === false) {
        return;
      }

      statusMessage.innerHTML = `<img class="feedback-form__preloader" src="./img/loading.svg">`;
    }
    const formData = new FormData(target);

    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        statusMessage.textContent =
          "Сообщение отправлено! Мы скоро с вами свяжемся.";
        setTimeout(() => {
          statusMessage.textContent = "";
        }, 6000);
      })
      .catch((error) => {
        console.error(error);
        statusMessage.textContent = "Что-то пошло не так...";
        setTimeout(() => {
          statusMessage.textContent = "";
        }, 6000);
      });

    target.reset();
  });

  const postData = (formData) => {
    return fetch("./send.php", {
      method: "POST",
      body: formData,
      action: "./send.php",
    });
  };
};

sendForm();

const moveUp = () => {
  let toTopBtn = document.querySelector(".to-top");

  document.addEventListener("scroll", () => {
    if (pageYOffset >= 650) {
      toTopBtn.classList.add("to-top--active");
    } else {
      toTopBtn.classList.remove("to-top--active");
    }
  });
};

moveUp();

const navigation = () => {
  let menuButton = document.querySelector(".burger-button"),
    navbarMenu = document.querySelector(".mobile-menu"),
    header = document.querySelector(".header");

  const moveToAnchor = (item) => {
    const blockID = item.getAttribute("href").substr(1);

    if (document.getElementById(blockID)) {
      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  document.addEventListener("click", (event) => {
    let target = event.target;

    if (
      target.closest(".burger-button") ||
      target.closest(".mobile-menu__item")
    ) {
      header.classList.add("header--fixed");
      navbarMenu.classList.toggle("mobile-menu--active");
      menuButton.classList.toggle("burger-button--active");
      document.body.classList.toggle("scroll-menu");
    }
    if (target.closest(".scroll-link")) {
      event.preventDefault();
      moveToAnchor(target.closest("a"));
    }
  });
};

navigation();

const toogleModal = () => {
  const modalOverlay = document.querySelector(".modal__overlay"),
    modalDialog = document.querySelector(".modal__dialog");

  const openModal = () => {
    modalOverlay.classList.add("modal__overlay--visible");
    modalDialog.classList.add("modal__dialog--visible");
    document.body.classList.add("scroll-menu");
  };

  const closeModal = () => {
    modalOverlay.classList.remove("modal__overlay--visible");
    modalDialog.classList.remove("modal__dialog--visible");
    document.body.classList.remove("scroll-menu");
  };

  document.addEventListener("click", (event) => {
    let target = event.target;

    if (target.matches('[data-toggle="modal"]')) {
      event.preventDefault();
      openModal();
    }

    if (
      target.closest(".modal__close") ||
      target.matches(".modal__overlay") ||
      target.closest(".modal__status-button")
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.keyCode === 27 &&
      modalOverlay.classList.contains("modal__overlay--visible")
    ) {
      closeModal();
    }
  });
};

toogleModal();

AOS.init();
