window.onload = function () {
   document.getElementById('my_audio').play();
   document.getElementById('my_audio').volume = 0.25;
}
function toggleSound(img) {
   img.src = img.src == "http://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/500px-Speaker_Icon.svg.png" ? "https://cdn2.iconfinder.com/data/icons/picons-essentials/57/music_off-512.png" : "http://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/500px-Speaker_Icon.svg.png";

   if (img.src == "https://cdn2.iconfinder.com/data/icons/picons-essentials/57/music_off-512.png")

      document.getElementById('my_audio').muted = true;

   else

      document.getElementById('my_audio').muted = false;
}

let loadMoreBtn = document.querySelector('#loadmorelist');
let currentItem = 18;
loadMoreBtn.onclick = () => {
   let boxes = [...document.querySelectorAll('.searchresult li')]
   currentItem != 30 ? loadMoreBtn.innerHTML = "Show Less" : loadMoreBtn.innerHTML = "Load more";
   if (currentItem == 30) {
      for (let j = 18; j < currentItem; j++) {
         boxes[j].style.display = 'none'
      }
      currentItem -= 12;
      return;
   }
   for (let i = currentItem; i < currentItem + 12; i++) {
      boxes[i].style.display = 'grid'
   }
   currentItem += 12;
}




let storebooks = document.getElementById("storebooks");
let bookBasket = JSON.parse(localStorage.getItem("data")) || []

let generateBooks = () => {
   return (storebooks.innerHTML = books.map((book) => {
      let { id, url, title, price } = book;
      let search = bookBasket.find((x)=>x.id === id) || [];
      return `<li>
      <a href="#">
          <div id=book-id-${id} class="searchimg">
              <img class="resultimg" alt="" src="../img/${url}">
              
          </div>
          
          </a>
          <div class="details">
          <p class="name">${title}</p>
      </div>
          <div class="price">
          <h2>$ ${price} </h2>
          <div class="buttons">
          <i onclick="decriment(${id})" class="bi bi-dash-lg"></i>
          <div id=${id} class="quantity">${search.item === undefined? 0: search.item}</div>
          <i onclick="incriment(${id})" class="bi bi-plus-lg"></i>
          </div>
      </div>


      
   </li>`
   }).join(""))
};
generateBooks();

let incriment = (id) => {
   let selectedItem = id;
   let search = bookBasket.find((x) => x.id === selectedItem)
   if (search === undefined) {
      bookBasket.push({
         id: selectedItem,
         item: 1,
      });
   }
   else {
      search.item += 1;
   }
   
   update(id);
   localStorage.setItem("data", JSON.stringify(bookBasket))
}
let decriment = (id) => {
   let selectedItem = id;
   let search = bookBasket.find((x) => x.id === selectedItem);
   if(search === undefined ) return
  else if (search.item === 0)
      return;

   else {
      search.item -= 1;
   }
   update(selectedItem);
   bookBasket = bookBasket.filter((x)=>x.item !==0)

   localStorage.setItem("data", JSON.stringify(bookBasket))
};
let update = (id) => {
   let search = bookBasket.find((x) => x.id === id);
   document.getElementById(id).innerHTML = search.item;
   cartCalc();

};

let cartCalc = () => {
   let cartAmount = document.getElementById("cartAmount");
   cartAmount.innerHTML = bookBasket.map((x) => x.item).reduce((x,y)=>x+y,0)
}

cartCalc();

let featuredImg = document.getElementsByClassName('featuredimg');
let featuredTitle = document.getElementsByClassName('featuredtitle');
let featuredText = document.getElementsByClassName('featuredtext');

let divBook = document.getElementsByClassName("resultimg");

for (let i = 0; i < divBook.length; i++) {
   divBook[i].onclick = function () {
      let url = this.src;
      let ara = url.split("img/");
      let result = ara.pop();
      for (let j in books) {
         if (result == books[j].url) {
            featuredImg[0].src = "../img/" + result;
            featuredTitle[0].innerHTML = books[j].title;
            featuredText[0].textContent = books[j].text;
         }
      }
   }
}
