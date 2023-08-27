/**
 *  2023 - DEV
 *  Developer: Kenneth Obsequio
 *  GitHub: https://github.com/lash0000
 *  License: GPL v3.0
 *
 */

//toggle for others now

const colorToggle = document.getElementById("colorToggle");
var body = document.body;

const colorPref = (value) => {
  localStorage.setItem("colorPref", value);
};

function toggleDarkMode() {
  body.classList.toggle("dark-mode");

  // Toggle the icon
  if (body.classList.contains("dark-mode")) {
    colorPref("on");
  } else {
    colorPref("off");
  }
}

const localPref = localStorage.getItem("colorPref");
if (localPref === "on") {
  body.classList.add("dark-mode");
}

colorToggle.addEventListener("click", toggleDarkMode);