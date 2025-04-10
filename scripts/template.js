function dishCardTemplate(dish) {
    return `
      <div class="dish-card" onclick="addToCart('${dish.name}')">
        <div class="dish-info">
          <div class="dish-title">${dish.name}</div>
          <div class="dish-description">${dish.description}</div>
          <div class="dish-price">${dish.price.toFixed(2)}€</div>
        </div>
        <div class="add-dish">
          <button class="add-button">
            <img src="./assets/icons/add_circle.png" alt="addBtn">
          </button>
        </div>
      </div>
    `;
  }


  function basketItemTemplate(dish) {
    return `
      <div class="basket_position">
        <div class="dish-title">${dish.name}</div>
        <div class="basket_quantity">
          <button class="reduce_basketbtn" onclick="decreaseQuantity('${dish.name}')">
            <img src="./assets/icons/Minus.png" alt="reduce">
          </button>
          <div class="basket_number">${dish.quantity} Stk.</div>
          <button class="add_basketbtn" onclick="increaseQuantity('${dish.name}')">
            <img src="./assets/icons/add.png" alt="add">
          </button>
          <div class="basket_price">
            <div class="dish-basketprice">${(dish.price * dish.quantity).toFixed(2)}€</div>
          </div>
          <div class="trash" onclick="removeFromCart('${dish.name}')">
            <img src="./assets/icons/Trash 2.svg" alt="trash">
          </div>
        </div>
      </div>
    `;
  }


  function orderPopUp(){
    return `      
    <div id="order-Popup" class="popup-message">
    <h2>Vielen Dank für deine Bestellung!</h2>
    <img src="./assets/icons/Thumbsup.svg" alt="Thumbs up">
  </div>
`;
}

function emptyCardMessage(){
  return`
  <div id="empty-Popup" class="popup-message">
  <h2>Bitte füge etwas dem Warenkorb hinzu!</h2>
  </div>
  `
}