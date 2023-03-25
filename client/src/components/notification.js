import{
products
}from "./Products/index.js"

export function createNotification(name,img,price) {
  let template = ` <div class="noti">
  <img class = "noti-image"
  src = "${img}"
  alt = "images" >
  <div class="noti-content">
  <h3 class="noti-title">${name}</h3>
  <p class="noti-desc">Giá: ${price}</p>
  </div>
  </div>`;
  //insert sau khi mở thẻ body
  document.body.insertAdjacentHTML("afterbegin", template);
}
export function randomNoti(){
  let lastTitle;
  const timer = setInterval(() => {
    const item = document.querySelector(".noti");

    if (item) {
      item.parentNode.removeChild(item);
    }
    // lấy ngẫu nhiên trong mảng randomData
    const title = products[Math.floor(Math.random() * products.length)];
    // console.log(title)
    // Nếu mà sản phẩm lần sau mà lặp lại sản phẩm lần trước thì sẽ chờ thêm 6 giây để hiện ra sản phẩm khác
    if (lastTitle !== title) {
      createNotification(title.name,title.img,new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'VND'
      }).format(title.price));
    }
    lastTitle = title;
  }, 6000);

}
