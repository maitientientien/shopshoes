import {
  renderCart,
  addCart,
  getLocalStorage,
  productListCart,
  paidCard,
} from '../cart/cart.js';
import { loader } from '../home/loader.js';
import { randomNoti } from '../notification.js';
import { showView } from './viewProduct.js';
import { renderSweetAlertError } from '../home/sweetAlert.js';

export const enpoint = 'https://639c3dee16d1763ab1438a00.mockapi.io/Products';
export const productList = document.querySelector('.product__list');
export const viewProductList = document.querySelector('.view-product');
// ------------------Dùng set để xóa hết các phần tử trùng---------------
let options = new Set();
export let products = [];

// ----------------------------- HÀM TẠO SẢN PHẨM -----------------------
 function renderProduct(item) {
  let convert = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND'
  });
  const template = `<div class=" col-md-6 col-lg-4">
          <div class="product__card">
              <div class="product__card-item" data-view="${item.id}">
                <div class="product__card-img">
                <img class="zoom" id="image" src="${item.img}" alt="image">
                </div>
                <div class="product__card-body">
                <div div class = "d-flex flex-column justify-content-between " >
                <h3>${item.name}</h3>
                  <div class="text-group">
                    <h4 class="product__card-text">${item.category}</h4>
                    <p class="product__card-price">${convert.format(item.price)}</p>
                    </div>
                </div>
                  <div class="btn-group d-flex justify-content-between align-items-center">
                    <button class="btn_primary add-cart" data-id="${item.id}" type="button">Add to cart</button>
                    <i class="fa-regular fa-heart add-like"></i>
                </div>
                            </div>
              </div>
          </div>
        </div>`;

        let templateView = `
         <div class="view-item" data-view="${item.id}" >
          <i class="fas fa-xmark view-close"></i>
          <div class="view-header">
            <h2 class="view-title">${item.name}</h2>
          </div>
          <div class="view-body">
            <div class="view-left">
              <img src="${item.img}" alt="images"  id="image" class="zoom" data-magnify-src="${item.img}">
            </div>
            <div class="view-right">
              <p>${item.disc}</p>
              <p class="view-price">Giá: ${convert.format(item.price)}</p>
              <p class="view-amount">Kho: ${item.amount}</p>
               <button class="btn_primary add-cart" data-id="${item.id}" type="button">Add to cart</button>
            </div>
          </div>
        </div>`;
        productList.insertAdjacentHTML("beforeend",template);
        viewProductList.insertAdjacentHTML("beforeend",templateView);
}

