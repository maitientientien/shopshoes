let template = `<a href="#" class="scroll">
  <i class="fas fa-hand-pointer"></i>
</a>`;
document.body.insertAdjacentHTML("afterbegin", template);
window.addEventListener("scroll",()=>{
  // console.log(window.scrollY>500)
  let scroll = window.scrollY > 500;
  let scollDom = document.querySelector(".scroll");
  if(scroll){
    scollDom.classList.add("active");
  }
  else{
    scollDom.classList.remove("active");
  }
})