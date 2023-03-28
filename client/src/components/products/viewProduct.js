function closeView() {
  let close = document.querySelectorAll('.view-close');
  let viewProduct = document.querySelector('.view-product');
  close.forEach((item) => {
    item.addEventListener('click', () => {
      // console.log(close.parentElement.parentElement)
      item.parentElement.parentElement.classList.remove('show');
    });
  });
  viewProduct.addEventListener('click', (e) => {
    // nếu mà người dùng bấm vào bất kì đâu nếu chỗ đó có xuất hiện class view-product là close form
    if (e.target.matches('.view-product')) {
      viewProduct.classList.remove('show');
      // console.log(e.target)
    }
  });
}
export function showView() {
  let show = document.querySelectorAll('.product__card-item');
  let view = document.querySelectorAll('.view-item');
  [...show].forEach((item) => {
    item.addEventListener('click', (e) => {
      // console.log(item.dataset.view)
      const number = item.dataset.view;
      // Đảm bảo rằng không phải nhấn vào nút add cart
      if (!e.target.matches('.btn_primary')) {
        // console.log(number);
        [...view].forEach((item) => {
          item.classList.remove('active');
          if (item.getAttribute('data-view') == number) {
            item.parentElement.classList.add('show');
            item.classList.add('active');
          }
        });
      }
    });
  });
  closeView();
}
