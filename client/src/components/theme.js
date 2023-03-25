import {
  setLocalStorage, getLocalStorage
}from "./cart/cart.js"
export function toggleMode(){
  let theme = document.querySelector(".theme");
  let themeIcon = document.querySelector(".theme-icon");
  let body = document.body;
  let MODE;
  theme.addEventListener("click", () => {
    // let sun = themeIcon.classList.toggle("fa-sun");
    let setTheme = body.classList.toggle("dark-mode")
    // themeIcon.classList.toggle("fa-moon")
    if (body.classList.contains("dark-mode")) {
      themeIcon.classList.add("fa-sun");
      themeIcon.classList.remove("fa-moon");
      MODE = "DARK";
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      MODE = "LIGHT";
    }
    setLocalStorage("mode", MODE);
  })
  let getTheme = getLocalStorage("mode");
  if (getTheme === "DARK") {
    body.classList.add("dark-mode");
    themeIcon.classList.add("fa-sun");
    themeIcon.classList.remove("fa-moon");
    
  } else {
    body.classList.remove("dark-mode");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");

  }
}