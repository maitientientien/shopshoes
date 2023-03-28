const template = ` <div class="loader">
      <img src="../assets/icons/load.gif" alt="load">
    </div>`;
export function loader(on){
  const load = document.querySelector(".loader");
  if(on){
    document.body.insertAdjacentHTML("afterbegin",template);
  }else{
    document.body.removeChild(load);
    
  }

}