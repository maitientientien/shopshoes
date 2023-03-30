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

// -------------------------------SỬ LÝ GIỎ HÀNG---------------------------

// chuyển sang định dạng tiền tệ việt nam
let convert = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'VND'
});

// Sử lí thêm sản phẩm vào giỏ hàng
export function renderCart() {
  let templateCart = '';

  let cardBodyProduct = document.querySelector(".cart-body");
  let cardBody = document.querySelector(".cartPage__body");
  // let totalProduct = item.price;
  // Lặp qua mảng giỏ hàng

  if (productListCart.length == 0) {
    notHaveProduct();

  } else {
    for (let i = 0; i < productListCart.length; i++) {
      let priceProduct = +productListCart[i].productCard[0].price * +productListCart[i].quanlity;
      let dataID = productListCart[i].productCard[0].id
      templateCart += `<tr class="main-cart">
                    <td>
                      <span class="custom-checkbox">    
                      <input type="checkbox" class="check-cart" id="select-${dataID}" data-checkbox="${dataID}">
                        <label label class = "check-box"
                        for = "select-${dataID}" >
                        </label>
                      </span>
                    </td>
                    <td>
                      <div class="product__name">
                        <img class="imgCart" src="${productListCart[i].productCard[0].img}" alt="image">
                        <span class="name">${productListCart[i].productCard[0].name}</span>
                      </div>
                    </td>
                    <td><span class="price">${convert.format(productListCart[i].productCard[0].price)}</span></td>
                    <td>
                      <div class="amount">
                      <button class="minus"  id="minus"  data-mcart="${dataID}"> <i class="fa-solid fa-minus"></i></button>
                      <input type="text" id="mount" value="${productListCart[i].quanlity}">
                      <button class="plus" id="plus" data-pcart="${dataID}"><i class="fa-solid fa-plus"></i></button>
                      </div>
                    </td>
                    <td>
                   <span class="totalProduct"> ${convert.format(priceProduct)}</span>
                    
                    </td>
                    <td><i class="fa-solid fa-trash text-danger cart__delete"  data-dcart="${dataID}"></i></td>
                  </tr>`;

      cardBodyProduct.innerHTML = templateCart;
    }
    cardBody.style.display = "flex";
    document.querySelector(".cartPage__footer").style.display = "block";
    let sad = document.querySelectorAll(".sad");
    sad.forEach(item => {
      item.style.display = "none";
    });
    // let amoutCart = document.querySelector("#mount").value;
    plusAmount();
    minusAmount();
    deleteProduct();
    // deleteByCheckBox();
    // selectedAll();
    btnDeleleEvent();
    totalProduct();
    paidCard();
  }
  setLocalStorage("cart", productListCart);
  document.querySelector(".quantityOfProducts").innerHTML = productListCart.length;
}

export function addCart() {

  // DOM các nút bấm trong html
  let button = document.querySelectorAll(".add-cart");
  [...button].forEach(item => {
    item.addEventListener("click", () => {
      // tạo 1 object chứa đựng cả mảng sản phẩm và số lượng
      let objCart = {
        productCard: [],
        quanlity: 1
      }
      //so sánh dataset của nút bấm thêm vào giỏ hàng
      const id = +item.dataset.id;
      for (let j = 0; j < productListCart.length; j++) {
        if (+productListCart[j].productCard[0].id == id) {
          // thông báo và ngừng lun chương trình để cho người dùng biết là đang có sản phẩm đó trong giỏ hàng. Người dùng có thể vào giỏ hàng để thêm số lượng
          renderSweetAlertWarning("Đã có sản phẩm trong giỏ hàng");
          return;
        }
      }
      for (let i = 0; i < products.length; i++) {
        // nếu id của nút bấm trùng với id sản phẩm thì thêm vào giỏ
        if (id == products[i].id) {
          // thêm sản phẩm vào trong đối tượng 
          objCart.productCard.push(products[i]);
          // console.log(objCart)
          //Sau đó đẩy cả đối tượng card vào mảng global
          productListCart.push(objCart);
          renderSweetAlertSuccess();
          // console.log(productListCart);
        }
      }
      renderCart();
    })
  })
}
// ----------------------------- TỔNG TIỀN -------------------------------------------
function totalProduct() {
  // console.log(intoMoney)
  let total = 0;
  for (let i = 0; i < productListCart.length; i++) {
    total += productListCart[i].productCard[0].price * productListCart[i].quanlity;
  }


  document.querySelector("#totalProduct").innerHTML = convert.format(total);
  // console.log(total);
  return total;
}

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