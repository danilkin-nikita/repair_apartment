"use strict";

window.addEventListener("scroll", function () {
  console.log(pageYOffset);
});

console.log(pageYOffset);

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
