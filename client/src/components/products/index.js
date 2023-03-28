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
