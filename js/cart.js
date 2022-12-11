let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart")

let bookBasket = JSON.parse(localStorage.getItem("data")) || [];
let cartCalc = () => {
    let cartAmount = document.getElementById("cartAmount");
    cartAmount.innerHTML = bookBasket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

cartCalc();
let generateCartItems = () => {
    if (bookBasket.length !== 0) {
        return (ShoppingCart.innerHTML = bookBasket.map((x) => {
            let {id,item} = x;
            let search = books.find((y)=>y.id === id) || [];
            let {url, title, price} = search
            return `
            <div class="cart-item">
            <img width="120" height="205" src=../img/${url} alt="" />
            <div class="cart-details">

            <div class="title-price-x">
                <h4 class"title-price">
                <p>${title}</p>
                <p class="cart-item-price">$ ${price}</p>
                </h4>
                
            </div>

            <div class="buttons">
                <i onclick="decriment(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="incriment(${id})" class="bi bi-plus-lg"></i>
            </div>
            <div class="multprice-x">
            <h3>$ ${item*price }</h3>
            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
                </div>
            </div>`
        }).join(''));

    }
    else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2> `;
    }
}
generateCartItems();

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
    generateCartItems();
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
    // bookBasket = bookBasket.filter((x)=>x.item !==0)
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(bookBasket))
 };
 let update = (id) => {
    let search = bookBasket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    cartCalc();
    totalAmount();
 
 };
 let removeItem = (id) =>{
    let selectedItem = id;
    bookBasket = bookBasket.filter((x)=>x.id !== selectedItem);
    generateCartItems();
    totalAmount();
    cartCalc();
    localStorage.setItem("data", JSON.stringify(bookBasket));

 };
 let totalAmount = () =>{
    if (bookBasket.length !== 0) {
        let amount = bookBasket.map((x)=>{
            let {item, id} = x;
            let search = books.find((y)=>y.id === id) || [];
            return item*search.price;
        }).reduce((x,y)=>x+y,0);
        label.innerHTML = `<h2>Total Bill : $ ${amount} </h2>
        <button onclick="checkOut()" class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>`;
    }
    else return;
 }

 let clearCart = ()=>{
    bookBasket = []
    generateCartItems();
    cartCalc();
    localStorage.setItem("data", JSON.stringify(bookBasket))
    

 }

 let checkOut = () =>{
    alert('Checkout function coming soon');
 }

 totalAmount();