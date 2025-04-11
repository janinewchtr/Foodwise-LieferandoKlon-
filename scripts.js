async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
  }



  let cart = [];



  function renderDishes(){
    let dishContainer = document.getElementById('dishes-container');
    dishContainer.innerHTML = "";
  
    for (let dishIndex = 0; dishIndex < dishes.length; dishIndex++) {
        let dish = dishes[dishIndex];
        dishContainer.innerHTML += dishCardTemplate(dish);
    }

    let savedCart = localStorage.getItem("cart");
        if (savedCart) {
          cart = JSON.parse(savedCart);
            
  updateCart();
}
  }
  

  function addToCart(dishName){
    let dish = findDish(dishName);
    let alreadyInCart = checkAlreadyInCart(dishName);
    addDishIfNotInCart(dish, alreadyInCart);

    updateCart();
  }


  function findDish(dishName){
    let dish = null;
    for (let dishIndex = 0; dishIndex < dishes.length; dishIndex++){
        if (dishes[dishIndex].name === dishName) {
            dish = dishes[dishIndex];
        }
    }

    return dish;
  }
  


  function checkAlreadyInCart(dishName) {
    let alreadyInCart = false;
    for (let cartIndex = 0; cartIndex < cart.length; cartIndex++){
        if (cart[cartIndex].name === dishName){
            cart[cartIndex].quantity++;
            alreadyInCart = true;
        }
    }

    return alreadyInCart;
  }
  


  function addDishIfNotInCart(dish, alreadyInCart){
    if (!alreadyInCart && dish !== null) {
        cart.push({
          name: dish.name,
          price: dish.price,
          quantity: 1,
        });
    }

  }
  


  function updateCart() {
    let basketItems = document.getElementById('basket-items');
    basketItems.innerHTML = ""; 
  
    for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
      let dish = cart[cartIndex];
      basketItems.innerHTML += basketItemTemplate(dish);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateSum();
  }



  function updateSum() {
    let subTotal = 0;
  
    for (let cartIndex = 0; cartIndex < cart.length; cartIndex++) {
      let dishInCart = cart[cartIndex];
      subTotal += dishInCart.price * dishInCart.quantity;
    }
  
    let deliveryCost = 5;
    let totalSum = subTotal + deliveryCost;
  
    document.getElementById("subTotal").innerHTML = `Zwischensumme: ${subTotal.toFixed(2)}€`;
    document.getElementById("deliveryCosts").innerHTML = `Lieferkosten: ${deliveryCost.toFixed(2)}€`;
    document.getElementById("totalCosts").innerHTML = `Gesamt: ${totalSum.toFixed(2)}€`;
}



function increaseQuantity(dishName){
    for (let cartIndex = 0; cartIndex < cart.length; cartIndex++){
        if (cart[cartIndex].name === dishName){
            cart[cartIndex].quantity++;
        }
    }
    
    updateCart();
}



function decreaseQuantity(dishName){
    for (let cartIndex = 0; cartIndex < cart.length; cartIndex++){
        if (cart[cartIndex].name === dishName) {
            if (cart[cartIndex].quantity > 1) {
              cart[cartIndex].quantity--;
            } else {
              cart.splice(cartIndex, 1);
            }
        }
    }
    updateCart();
}



function removeFromCart(dishName){
    for (let cartIndex = 0; cartIndex < cart.length; cartIndex++){
        if (cart[cartIndex].name === dishName){
            cart.splice(cartIndex, 1)
        }
    }
    updateCart();
}



function toggleMobileBasket() {
  let basket = document.getElementById('basket');
  let content = document.getElementById('content');

  let visible = basket.classList.toggle('show');
  content.classList.toggle('hide', visible);


    updateCart();
  
}



function closePopUp(){
  let emptyPopUp = document.getElementById('empty-Popup');
  let popUp = document.getElementById('order-Popup');

  if(emptyPopUp){
    emptyPopUp.remove();
  }

  if(popUp){
    popUp.remove();
  }

  clearBasket();

}


function orderEvent(){
  if(cart.length === 0){
    showEmptyCardMessage();

  } else{
    removeExistingOrderPopUp();
    showOrderPopUp();
  }
}



function removeExistingOrderPopUp(){
  let thanksPopUp = document.getElementById('order-Popup');

  if(thanksPopUp){
    thanksPopUp.remove();
  }
}

function showOrderPopUp(){
  let popUpContainer = document.createElement('div');
  popUpContainer.innerHTML = orderPopUp();

  document.body.appendChild(popUpContainer.firstElementChild);

  setTimeout(closePopUp, 1000);

   }



function clearBasket(){

  cart = [];
  updateCart();
}




function showEmptyCardMessage(){
  let emptyMessage = document.createElement('div');
  emptyMessage.innerHTML = emptyCardMessage();

  document.body.appendChild(emptyMessage);

  setTimeout(closePopUp, 1000);

}