 const endpoint = "https://639c3dee16d1763ab1438a00.mockapi.io/Products";
let formsm = document.getElementById("productForm");
// ----------------------------------- TẠO MỚI SẢN PHẨM-------------------------------

async function addNewProduct({
  name,
  price,
  disc,
  category,
  amount,
  img,
}) {
  await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      name,
      price,
      disc,
      category,
      amount,
      img,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
formsm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const product = layThongTinTuForm();
  // console.log(product);
  Swal.fire(
    'Thêm mới thành công',
    'Sản phẩm đã được thêm mới, bạn hãy quay lại danh sách để xem',
    'success'
  )
  await addNewProduct(product);
  formsm.reset();
})
 function layThongTinTuForm() {
  let name = document.getElementById("tenSP").value;
  let price = +document.getElementById("giaSP").value;
  let category = document.getElementById("theloaiSp").value;
  let amount = +document.getElementById("soLuong").value;
  let img = document.getElementById("hinhSP").value;
  let disc = document.getElementById("moTa").value;

  return {
     name,
     price,
     disc,
     category,
     amount,
     img
  };
};
