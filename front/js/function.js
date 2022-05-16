//Fonction récupérer éléments du local storage
function getFromStorage() {
  return localStorage.getItem("CART");
}

//Fonction vérifier si article en doublon
function checkProduct(addedProduct) {
  const cart = JSON.parse(getFromStorage());
  let findSameIndex = cart.findIndex(
    (object) =>
      object.id == addedProduct.id && object.color == addedProduct.color
  );
  return findSameIndex;
}

//Fonction envoi du panier au local storage
function addToLocalStorage(addedProduct) {
  const storage = getFromStorage();

  if (storage) {
    cart = JSON.parse(storage);
    const sameProductIndex = checkProduct(addedProduct);
    if (sameProductIndex >= 0) {
      cart[sameProductIndex].quantity = String(
        parseFloat(cart[sameProductIndex].quantity) +
          parseFloat(addedProduct.quantity)
      );
      cart[sameProductIndex].totalPrice = String(
        parseFloat(cart[sameProductIndex].totalPrice) +
          parseFloat(addedProduct.price)
      );
    } else {
      cart.push(addedProduct);
    }
    localStorage.setItem("CART", JSON.stringify(cart));
  } else {
    let cart = [];
    cart.push(addedProduct);
    localStorage.setItem("CART", JSON.stringify(cart));
  }
}
