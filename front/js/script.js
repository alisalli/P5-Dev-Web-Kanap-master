// Requête API pour récupérer l'ensemble des produits
fetch("http://localhost:3000/api/products")
.then(res => {
    return res.json();
})
.then(dataList => {
    console.log(dataList);

// afficher les produits sur la page d'accueil
dataList.forEach(data => {
    document.getElementById("items").innerHTML += `<a href="./product.html?id=${data._id}"><article> <img src="${data.imageUrl}" alt="${data.altTxt}">
                                                    <h3 class="productName">${data.name}</h3>
                                                    <p class="productDescription">${data.description}</p></article></a>`;
    
})
});
