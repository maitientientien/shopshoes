import {
  renderSweetAlertSuccess,
  renderSweetAlertWarning,
  renderSweetAlertError
} from "../home/sweetAlert.js"
import {
  products,
  enpoint,
  notHaveProduct
} from "../Products/index.js"
// tạo biến productListCart để lưu trữ dữ liệu của giỏ hàng
export let productListCart = [];

let cart = document.querySelector(".cart");
let btnClose = document.querySelector(".cartPage__close");
let like = document.querySelectorAll(".add-like");
let overlay = document.querySelector(".cartPage__overlay");

//----------------------- CÁC CHỨC NĂNG ĐÓNG MỞ GIỎ HÀNG-----------------------------

// nút bấm mở giỏ hàng
cart.addEventListener("click", toggleCartPage);
export function toggleCartPage() {
  document.querySelector(".cartPage").classList.add("active");
  document.querySelector(".cartPage__overlay").style.display = "block";
}
// nút đóng giỏ hàng
btnClose.addEventListener("click", () => {
  btnClose.parentElement.parentElement.parentElement.classList.remove("active");
  document.querySelector(".cartPage__overlay").style.display = "none";

});
// Click vào overlay sẽ đóng giỏ hàng
overlay.addEventListener("click", (e) => {
  e.target.style.display = "none";
  e.target.previousElementSibling.classList.remove("active");
});


// ------------------------------------SỬ LÝ LOCALSTORAGE---------------------------

// Lưu vào localStorage
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
export function getLocalStorage(value) {
  let local = localStorage.getItem(value);
  if (!local) return [];
  return JSON.parse(local);
}