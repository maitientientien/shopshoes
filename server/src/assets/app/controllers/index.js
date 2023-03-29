let updateId = null;
let tbodyProduct = document.querySelector("#tbodyProduct");
 const endpoint = "https://639c3dee16d1763ab1438a00.mockapi.io/Products";
/**
 * 
 *  <th>Tên</th>
    <th>Giá</th>
     <th>Mô tả</th>
     <th>Thể loại</th>
      <th>Số lượng</th>
     <th>Hình ảnh</th>
      <th>Thao tác</th>
 * 
 */


// ---------------------------------LẤY SẢN PHẨM----------------------
  async function getFullProduct() {
    loader(true);
  try {

    const respone = await fetch(endpoint);
    const data = await respone.json();
    tbodyProduct.innerHTML = "";
    // Kiểm tra xem có chắc chắn là có dữ liệu hay không, và dữ liệu đó có phải là mảng hay không rồi mới render ra giao diện
    if (data.length > 0 && Array.isArray(data)) {
      data.forEach(item => {
        renderProduct(item);
      })
    }
  } catch (error) {
    //  document.body.innerHTML = "";
    console.log(error);
  }
  loader(false)
}
function renderProduct(item) {
  let convert = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND'
  });
  let template = `
        <tr>
                  <td class="product-name">${item.name}</td>
                  <td class="product-price">${convert.format(item.price)}</td>
                  <td class="product-disc">${item.disc}</td>
                  <td class="product-category">${item.category}</td>
                  <td class="product-amount">${item.amount}</td>
                  <td class="product-image">
                    <img src="${item.img}" alt="image">
                  </td>
                  <td class="d-flex justify-content-center flex-column product-setting">
                    <button button class = "btn-success product-update"
                    onclick = "updateClick(${item.id})"
                    type = "button"
                    data-toggle="modal"
                    data-target="#exampleModal">Sửa</button>
                    <button class="btn-danger product-delete mt-2" onclick="deleteClick(${item.id})">Xóa</button>
                  </td>
                </tr>
    `;
    tbodyProduct.insertAdjacentHTML("beforeend", template);
  }
