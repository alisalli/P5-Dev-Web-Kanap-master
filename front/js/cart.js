let products = []; //tableau de produits (à envoyer avec l'objet contact pour la commande)

// --------------------- Affichage du panier

//Récupérer les données stockées dans le local storage
const storage = JSON.parse(localStorage.getItem("CART"));
console.log(storage);

//Afficher les produits du panier sur la page
storage.forEach((element) => {
  document.getElementById(
    "cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${element.id}" data-color="${element.color}">
                                <div class="cart__item__img">
                                    <img src="${element.image}" alt="${element.altTxt}">
                                </div>
                                <div class="cart__item__content">
                                    <div class="cart__item__content__description">
                                        <h2>${element.name}</h2>
                                        <p>${element.color}</p>
                                        <p>${element.price}, 00 €</p>
                                    </div>
                                    <div class="cart__item__content__settings">
                                        <div class="cart__item__content__settings__quantity">
                                        <p>Qté :</p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
                                        </div>
                                        <div class="cart__item__content__settings__delete">
                                            <p class="deleteItem">Supprimer</p>
                                        </div>
                                    </div>
                                </div>
                            </article>`;

  //Ajouter les ID des produits du panier au tableau des produits
  let orderedId = `${element.id}`;
  products.push(orderedId);
});

// Afficher le nombre total d'articles
let sumQuantity = 0;
storage.forEach((Object) => {
  sumQuantity += JSON.parse(Object.quantity);
});
document.getElementById("totalQuantity").textContent = sumQuantity;

// Afficher le prix total
let sumPrice = 0;
storage.forEach((Object) => {
  sumPrice += JSON.parse(Object.totalPrice);
});
document.getElementById("totalPrice").textContent = sumPrice;

// --------------------- Modification du panier

// Supprimer un produit
let deleteButton = [...document.getElementsByClassName("deleteItem")];
deleteButton.forEach((element, index) => {
  element.addEventListener("click", () => {
    // supprimer dans le DOM
    let deletedProduct = deleteButton[index].closest(".cart__item");
    deletedProduct.remove();

    // supprimer dans le local storage
    storage.splice(index, 1);
    localStorage.setItem("CART", JSON.stringify(storage));
    location.reload();
  });
});

// Modification de la quantité par le client
let newQuantityInput = [...document.getElementsByClassName("itemQuantity")];
let productsInCart = document.getElementById("cart__items");
newQuantityInput.forEach((productsInCart, index) => {
  productsInCart.addEventListener("change", () => {
    if (newQuantityInput[index].value <= 0) {
      // supprimer dans le DOM
      let deletedProduct = newQuantityInput[index].closest(".cart__item");
      deletedProduct.remove();

      // supprimer dans le local storage
      storage.splice(index, 1);
      localStorage.setItem("CART", JSON.stringify(storage));
      location.reload();
    } else {
      // modifie la quantité dans le local storage
      storage[index].quantity = newQuantityInput[index].value;
      storage[index].totalPrice =
        newQuantityInput[index].value * storage[index].price;
      localStorage.setItem("CART", JSON.stringify(storage));
      location.reload();
    }
  });
});

// --------------------- Validation des inputs du formulaire

let regExpLetters = /^[a-zA-Zàáâãäæçèéêëìíîïñòóôõöœšùúûü\s\-']+$/;
let regExpLettersAndNumbers = /^[a-zA-Zàáâãäæçèéêëìíîïñòóôõöœšùúûü0-9\s\-',]+$/;
let regExpEmail = /^[a-zA-Z0-9.\-_]+[@]{1}[a-zA-Z0-9.\-_]+[.]{1}[a-z]{2,10}$/;

//Prénom
let formFirstName = document.getElementById("firstName");
formFirstName.addEventListener("change", function () {
  let inputToCheck = formFirstName.value;
  let test = regExpLetters.test(inputToCheck);
  if (test) {
    document.getElementById("firstNameErrorMsg").textContent = "";
  } else {
    document.getElementById("firstNameErrorMsg").textContent =
      "Les données renseignées ne sont pas valides";
  }
});

//Nom
let formLastName = document.getElementById("lastName");
formLastName.addEventListener("change", function () {
  let inputToCheck = formLastName.value;
  let test = regExpLetters.test(inputToCheck);
  if (test) {
    document.getElementById("lastNameErrorMsg").textContent = "";
  } else {
    document.getElementById("lastNameErrorMsg").textContent =
      "Les données renseignées ne sont pas valides";
  }
});

//Adresse
let formAddress = document.getElementById("address");
formAddress.addEventListener("change", function () {
  let inputToCheck = formAddress.value;
  let test = regExpLettersAndNumbers.test(inputToCheck);
  if (test) {
    document.getElementById("addressErrorMsg").textContent = "";
  } else {
    document.getElementById("addressErrorMsg").textContent =
      "Les données renseignées ne sont pas valides";
  }
});

//Ville
let formCity = document.getElementById("city");
formCity.addEventListener("change", function () {
  let inputToCheck = formCity.value;
  let test = regExpLetters.test(inputToCheck);
  if (test) {
    document.getElementById("cityErrorMsg").textContent = "";
  } else {
    document.getElementById("cityErrorMsg").textContent =
      "Les données renseignées ne sont pas valides";
  }
});

//Email
let formEmail = document.getElementById("email");
formEmail.addEventListener("change", function () {
  let inputToCheck = formEmail.value;
  let test = regExpEmail.test(inputToCheck);
  if (test) {
    document.getElementById("emailErrorMsg").textContent = "";
  } else {
    document.getElementById("emailErrorMsg").textContent =
      "L'adresse mail renseignée n'est pas valide";
  }
});

// -------------------- Envoi de la commande

document.getElementById("order").addEventListener("click", function (e) {
  e.preventDefault();

  // conditions pour que la commande soit traitée : champs correctement complétés + panier rempli
  if (
    regExpLetters.test(formFirstName.value) === true &&
    regExpLetters.test(formLastName.value) === true &&
    regExpLettersAndNumbers.test(formAddress.value) === true &&
    regExpLetters.test(formCity.value) === true &&
    regExpEmail.test(formEmail.value) === true &&
    products.length != 0
  ) {
    // création de l'objet contact à envoyer à l'API
    let contact = {
      lastName: formFirstName.value,
      firstName: formLastName.value,
      address: formAddress.value,
      city: formCity.value,
      email: formEmail.value,
    };

    // requête API pour envoyer l'objet contact + le tableau des produits
    const order = {
      contact,
      products,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:3000/api/products/order`, options)
      .then((res) => {
        return res.json();
      })
// Récupérer le n° de commande
.then(data => {
  let orderId = data.orderId;
  
  //redirection vers la page confirmation
  document.location.href = `http://127.0.0.1:5500/front/html/confirmation.html?id=${orderId}`;
});        


} else {
alert("Veuillez vérifier votre panier et intégralement remplir le formulaire avant de passer votre commande.");
}
})
