const alert1 = "Thêm vào giỏ thành công!";
const alert2 = "Chức năng đang phát triển";

export function renderSweetAlertSuccess() {
  const templateWeetAlert = `<div class="sweet-alert success">
  <i class="fa-solid fa-thumbs-up  sweet-icon success"></i>
  <div class="sweet-text">
    <h3 class="sweet-title success">Thông báo từ hệ thống</h3>
    <p class="sweet-content">${alert1}</p>
  </div>
</div>`;
  document.body.insertAdjacentHTML("afterbegin", templateWeetAlert);
  deleteAlert(".sweet-alert");
}
export function renderSweetAlertWarning(text = alert2) {
  const templateWeetAlert = `<div class="sweet-alert warning">
  <i class="fa-solid fa-triangle-exclamation sweet-icon warning"></i>
  <div class="sweet-text">
    <h3 class="sweet-title warning">Thông báo từ hệ thống</h3>
    <p class="sweet-content">${text}</p>
  </div>
</div>`;
  document.body.insertAdjacentHTML("afterbegin", templateWeetAlert);
  deleteAlert(".sweet-alert");
}
export function renderSweetAlertError(text = alert2){
  const templateWeetAlert = `<div class="sweet-alert error">
  <i class="fa-solid fa-ban sweet-icon error"></i>
  <div class="sweet-text">
    <h3 class="sweet-title error">Thông báo từ hệ thống</h3>
    <p class="sweet-content">${text}</p>
  </div>
</div>`;
  document.body.insertAdjacentHTML("afterbegin", templateWeetAlert);
  deleteAlert(".sweet-alert");
}
export function deleteAlert(value){
  const timmer = setTimeout(()=>{
   let deleteValue = document.querySelectorAll(value);
   deleteValue.forEach(item=>{
     if (item) {
       item.parentNode.removeChild(item);
     }
   })
 },20000)
}