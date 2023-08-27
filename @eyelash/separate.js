/**
 *  2023 - DEV
 *  Developer: Kenneth Obsequio
 *  GitHub: https://github.com/lash0000
 *  License: GPL v3.0
 *
 */

const scrollTopButton = document.getElementById("scrollTop");

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    scrollTopButton.style.display = "none";
  } else {
    scrollTopButton.style.display = "block";
  }
});