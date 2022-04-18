// récupérer le n° de commande

let orderId;
let str = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname + window.location.search;
let url = new URL(str);
let search_params = new URLSearchParams(url.search);
if(search_params.has('id')) {
    orderId = search_params.get('id');
    console.log(orderId);
}

// afficher le n° de commande sur la page
let orderIdPlace = document.getElementById("orderId");
orderIdPlace.textContent = orderId;

// Vider le Local Storage
localStorage.clear();