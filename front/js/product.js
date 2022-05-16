// ------------------- Récupération de l'ID du produit
let productId;
let str =
  window.location.protocol +
  "//" +
  window.location.host +
  "/" +
  window.location.pathname +
  window.location.search;
let url = new URL(str);
let search_params = new URLSearchParams(url.search);
if (search_params.has("id")) {
  productId = search_params.get("id");
  //console.log(productId);
}

// ------------------- Récupération données du produit (format Json) pour affichage du produit dans la page

let colorOption;
let cart = [];
let dataSet;
const addedColor = document.querySelector("#colors");
const addedQuantity = document.getElementById("quantity");
const addButton = document.getElementById("addToCart");

// requête API => affichage détail du produit sur la page
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => {
    return res.json();
  })
  .then((dataList) => {
    //afficher les détails du produit sur la page
    dataSet = dataList;
    document.querySelector("#title").textContent += dataList.name;
    document.querySelector("#price").textContent += dataList.price;
    document.querySelector("#description").textContent += dataList.description;
    document.querySelector(
      "div.item__img"
    ).innerHTML = `<img src="${dataList["imageUrl"]}" alt="${dataList["altTxt"]}">`;

    dataList.colors.forEach((element) => {
      colorOption = document.createElement("option");
      document.getElementById("colors").appendChild(colorOption);
      colorOption.innerHTML = `<option value="${element}">${element}</option>`;
    });

    //Event Listener bouton Ajouter au Panier
    addButton.addEventListener("click", addProduct);
  });

//Fonction ajouter un produit au panier (création objet + ajout au panier)
function addProduct() {
  //console.log(dataSet);
  if (addedColor.value == "" || addedQuantity.value < 1) {
    alert(
      "Afin de confirmer votre commande, veuillez sélectionner une couleur et une quantité pour votre produit."
    );
  } else {
    let addedProduct = {
      id: productId,
      name: dataSet.name,
      color: addedColor.value,
      price: dataSet.price,
      image: dataSet.imageUrl,
      altTxt: dataSet.altTxt,
      quantity: addedQuantity.value,
      totalPrice: addedQuantity.value * dataSet.price,
    };
    addToLocalStorage(addedProduct);
    alert("Votre produit a bien été ajouté à votre panier.");
    //location.reload();
    window.location.assign("cart.html");
  }
}

// Validation quantité saisie
let regExp = /^[0-9]+$/;
addedQuantity.addEventListener("change", function () {
  let test = regExp.test(addedQuantity.value);
  if (test === false) {
    alert("Merci de saisir une quantité valide pour votre commande.");
    addedQuantity.value = "";
  }
});
