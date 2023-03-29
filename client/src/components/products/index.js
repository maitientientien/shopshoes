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


// -------------------------------- LẤY DANH SÁCH SẢN PHẨM TỪ API ---------------------
export async function getFullProduct() {
  loader(true);
  try {
    const respone = await fetch(enpoint);
    const data = await respone.json();
    // Kiểm tra xem có chắc chắn là có dữ liệu hay không, và dữ liệu đó có phải là mảng hay không rồi mới render ra giao diện
    if (data.length > 0 && Array.isArray(data)) {
      data.forEach(item => {
        renderProduct(item);
        let convert = item.category.split(" ")[0].replace("'s", "");
        // console.log(typeof convert);
        // Thêm vào Set
        options.add(convert);
        products.push(item);
        // console.log(products);
      })
    }
  } catch (error) {
   renderSweetAlertError("Có lỗi xảy ra với hệ thống");
  //  document.body.innerHTML = "";
  }
  loader(false);
  renderOption();
  addCart();
  sortPrice();
  randomNoti();
  showView();

}
// ----------------------------Option chọn sản phẩm-------------------------
let option = document.querySelector(".product__select");
function renderOption(){
  options.forEach(item=>{
    let template = `<option  value="${item}">${item}</option>`;
    // console.log(item);
    if(item){
      option.insertAdjacentHTML('beforeend',template);

    }
  })
  SortName();
}

// ------------------------------------ Sắp xếp sản phẩm theo tên ---------------------
 function SortName(){
  let e = document.getElementById("product__select");
  e.addEventListener("change",()=>{
    // loader(true);
    let giaTri = e.options[e.selectedIndex].text;
    // console.log(giaTri)
    productList.innerHTML = "";
    viewProductList.innerHTML ="";
    products.forEach(item=>{
      if(item.category.includes(giaTri)){
        // console.log(item)
        renderProduct(item);
        showView();
      }
      else if (giaTri=="All") {
        renderProduct(item);
         showView();

      }
      // loader(false)
    })
    
  })
  
}

// ---------------------------------------------Sắp xếp theo giá-----------------------
export function sortPrice(){
  let tempt = [];
  let e = document.getElementById("price__select");
  e.addEventListener("change", () => {
    let giaTri = e.options[e.selectedIndex].text;
    let down = giaTri.toLowerCase().includes("cao đến thấp");
    productList.innerHTML = "";
    viewProductList.innerHTML = "";

      if(down){
        for(let i=0;i<products.length;i++){
          for(let j=i+1;j<products.length;j++){
            if(products[j].price>products[i].price){
              tempt = products[j];
              products[j] = products[i];
              products[i] = tempt;
            }
            
          }
          renderProduct(products[i]);
          showView();

          // console.log(products[i]);
        }
      }
      else{
         for (let i = 0; i < products.length; i++) {
           for (let j = i + 1; j < products.length; j++) {
             if (products[j].price < products[i].price) {
               tempt = products[j];
               products[j] = products[i];
               products[i] = tempt;
             }

           }
           renderProduct(products[i]);
            showView();

           // console.log(products[i]);
         }
      }
  })
}

