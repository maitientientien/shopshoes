import {
  renderSweetAlertSuccess,
  renderSweetAlertWarning,
  renderSweetAlertError,
} from "../home/sweetAlert.js";
import { products, enpoint, notHaveProduct } from "../Products/index.js";

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
let convert = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "VND",
});

// Sử lí thêm sản phẩm vào giỏ hàng
export function renderCart() {
  let templateCart = "";

  let cardBodyProduct = document.querySelector(".cart-body");
  let cardBody = document.querySelector(".cartPage__body");
  // let totalProduct = item.price;

  // Lặp qua mảng giỏ hàng, để render ra sản phẩm tương ứng gồm tên, giá, số lượng, thành tiền và các thao tác thêm sửa xóa

  if (productListCart.length == 0) {
    notHaveProduct();
  } else {
    for (let i = 0; i < productListCart.length; i++) {
      let priceProduct =
        +productListCart[i].productCard[0].price * +productListCart[i].quanlity;
      let dataID = productListCart[i].productCard[0].id;
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
                        <img class="imgCart" src="${
                          productListCart[i].productCard[0].img
                        }" alt="image">
                        <span class="name">${
                          productListCart[i].productCard[0].name
                        }</span>
                      </div>
                    </td>
                    <td><span class="price">${convert.format(
                      productListCart[i].productCard[0].price
                    )}</span></td>
                    <td>
                      <div class="amount">
                      <button class="minus"  id="minus"  data-mcart="${dataID}"> <i class="fa-solid fa-minus"></i></button>
                      <input type="text" id="mount" value="${
                        productListCart[i].quanlity
                      }">
                      <button class="plus" id="plus" data-pcart="${dataID}"><i class="fa-solid fa-plus"></i></button>
                      </div>
                    </td>
                    <td>
                   <span class="totalProduct"> ${convert.format(
                     priceProduct
                   )}</span>
                    
                    </td>
                    <td><i class="fa-solid fa-trash text-danger cart__delete"  data-dcart="${dataID}"></i></td>
                  </tr>`;

      cardBodyProduct.innerHTML = templateCart;
    }
    cardBody.style.display = "flex";
    document.querySelector(".cartPage__footer").style.display = "block";
    let sad = document.querySelectorAll(".sad");
    sad.forEach((item) => {
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
  document.querySelector(".quantityOfProducts").innerHTML =
    productListCart.length;
}

export function addCart() {
  // DOM các nút bấm trong html
  let button = document.querySelectorAll(".add-cart");
  [...button].forEach((item) => {
    item.addEventListener("click", () => {
      // tạo 1 object chứa đựng cả mảng sản phẩm và số lượng
      let objCart = {
        productCard: [],
        quanlity: 1,
      };
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
    });
  });
}

// ----------------------------- TỔNG TIỀN -------------------------------------------
function totalProduct() {
  // console.log(intoMoney)
  let total = 0;
  for (let i = 0; i < productListCart.length; i++) {
    total +=
      productListCart[i].productCard[0].price * productListCart[i].quanlity;
  }

  document.querySelector("#totalProduct").innerHTML = convert.format(total);
  // console.log(total);
  return total;
}

// ----------------------------------- TĂNG SẢN PHẨM--------------------------------------
function plusAmount() {
  let plus = document.querySelectorAll(".plus");
  let sum = 0;
  [...plus].forEach((item) => {
    item.addEventListener("click", (e) => {
      // console.log(item)
      const id = +item.dataset.pcart;
      for (let i = 0; i < productListCart.length; i++) {
        let amount = productListCart[i].productCard[0].amount;

        if (id == +productListCart[i].productCard[0].id) {
          // console.log(id)
          // console.log(id, productListCart)
          if (productListCart[i].quanlity >= amount) {
            renderSweetAlertError(
              `Bạn chỉ được mua tối đa ${amount} trong 1 đơn hàng`
            );
            productListCart[i].quanlity = amount;
            item.disabled = true;
            item.style.pointerEvents = "none";
            // renderCart();
            return;
          } else {
            productListCart[i].quanlity++;
            // console.log(productListCart);
            renderCart();
          }
        }
        // console.log(item)
      }
      // renderCart();
    });
  });
}

//------------------------------------GIẢM SẢN PHẨM------------------------------
function minusAmount() {
  let minus = document.querySelectorAll(".minus");
  for (let i = 0; i < productListCart.length; i++) {
    minus.forEach((item) => {
      item.addEventListener("click", () => {
        if (+item.dataset.mcart == +productListCart[i].productCard[0].id) {
          if (productListCart[i].quanlity <= 1) {
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
              },
              buttonsStyling: false,
            });

            swalWithBootstrapButtons
              .fire({
                title: "Bạn có chắc muốn xóa",
                text: "Bạn sẽ không thể hoàn tác khi đã xóa",
                icon: "question",
                width: "50rem",
                showCancelButton: true,
                confirmButtonText: "Tiếp tục",
                cancelButtonText: "Hủy",
                reverseButtons: true,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  productListCart.splice(productListCart[i], 1);
                  renderCart();
                  swalWithBootstrapButtons.fire(
                    "Đã xóa!",
                    "Sản phẩm của bạn đã bị xóa",
                    "success"
                  );
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    "Đã hủy",
                    "Sản phẩm của bạn vẫn còn nhé!",
                    "error"
                  );
                }
              });

            return;
          } else {
            productListCart[i].quanlity--;
            // console.log(productListCart[i].quanlity);
            renderCart();
          }
        }
      });
    });
  }
}
// ----------------------------------XÓA SẢN PHẨM ----------------------------------
function deleteProductCheckID(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      title: "Bạn có chắc muốn xóa",
      text: "Bạn sẽ không thể hoàn tác khi đã xóa",
      icon: "question",
      width: "50rem",
      showCancelButton: true,
      confirmButtonText: "Tiếp tục",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        productListCart.splice(productListCart[id], 1);
        renderCart();
        swalWithBootstrapButtons.fire(
          "Đã xóa!",
          "Sản phẩm của bạn đã bị xóa",
          "success"
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Đã hủy",
          "Sản phẩm của bạn vẫn còn nhé!",
          "error"
        );
      }
    });
}
// function deleteAllCart(){
//   let deleteAll =  document.querySelector("")
//   productListCart.splice(0,productListCart.length);
// }

function btnDeleleEvent() {
  deleteByCheckBox();
  let btnDelete = document.querySelector(".btn-deleteCheck");
  let selectAll = document.querySelector("#SelectAll");
  btnDelete.addEventListener("click", () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        title: "Bạn có chắc muốn xóa những sản phẩm đã chọn?",
        text: "Bạn sẽ không thể hoàn tác khi đã xóa",
        icon: "question",
        width: "50rem",
        showCancelButton: true,
        confirmButtonText: "Tiếp tục",
        cancelButtonText: "Hủy",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const newArr = productListCart.filter(
            (item) => !checkArr.includes(item)
          );
          productListCart = newArr;
          checkArr.length = 0;
          selectAll.checked = false;
          // console.log(newArr);
          renderCart();
          swalWithBootstrapButtons.fire(
            "Đã xóa!",
            "Sản phẩm của bạn đã bị xóa",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Đã hủy",
            "Sản phẩm của bạn vẫn còn nhé!",
            "error"
          );
        }
      });
  });
}

// -------------------------------- Khi window load xong--------------------------
window.onload = () => {
  let productListFromLocal;
  getFullProduct();
  seachProduct();
  productListFromLocal = getLocalStorage("cart");
  if (productListFromLocal.length > 0 && Array.isArray(productListFromLocal)) {
    productListFromLocal.forEach((item) => {
      productListCart.push(item);
      renderCart();
    });
  } else {
    notHaveProduct();
  }
  document.querySelector(".quantityOfProducts").innerHTML =
    productListFromLocal.length;
  // let mapProductList();
};

// ----------------------------------Tìm kiếm sản phẩm-----------------------------------
export function seachProduct() {
  let search = document.querySelector(".search__input");
  search.addEventListener("input", () => {
    productList.innerHTML = "";
    viewProductList.innerHTML = "";

    // console.log(search.value)
    let userSearch = products.filter((value) => {
      return value.name.toLowerCase().includes(search.value.toLowerCase());
    });
    //  console.log(userSearch)
    userSearch.forEach((item) => {
      renderProduct(item);
      showView();

      // console.log(item)
    });
  });
}

// -------------------------- Khi chưa có sản phẩm trong giỏ hàng-----------------

export function notHaveProduct() {
  let template = `<h3 class="sad" >Chưa có sản phẩm nào trong giỏ hàng</h3>
    <img src="../assets/icons/sad.png" style="width:300px" class="mt-5 mx-auto sad"/>`;
  document.querySelector(".cartPage__body").style.display = "none";
  document.querySelector(".cartPage__footer").style.display = "none";
  document
    .querySelector(".cartPage__content")
    .insertAdjacentHTML("beforeend", template);
}
