//toggle on scroll next

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