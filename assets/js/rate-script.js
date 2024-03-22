// let stars = document.querySelectorAll(".gameRate span");
// let products = document.querySelectorAll(".gameRate");
// let ratings = [];

// for (let star of stars) {
//     star.addEventListener("click", function () {

//         let children = star.parentElement.children;
//         for (let child of children) {
//             if (child.getAttribute("data-clicked")) {
//                 return false;
//             }
//         }

//         this.setAttribute("data-clicked", "true");
//         let rating = this.dataset.rating;
//         let productId = this.parentElement.dataset.productid;
//         let data = {
//             "rating": rating,
//             "product-id": productId,
//         }
//         ratings.push(data);
//         localStorage.setItem("rating", JSON.stringify(ratings));
//     });
// }

// if (localStorage.getItem("rating")) {
//     ratings = JSON.parse(localStorage.getItem("rating"));
//     for (let rating of ratings) {
//         for (let product of products) {
//             if (product.dataset.productid == rating["product-id"]) {
//                 let reverse = Array.from(product.children).reverse();
//                 let index = parseInt(rating["rating"]) - 1;
//                 reverse[index].setAttribute("data-clicked", "true");
//             }
//         }
//     }
// }


// Récupération du groupe d'étoiles pour la notation
const starElements = document.querySelectorAll('.star-rate')

starElements.forEach(function(element){
    element.addEventListener("click", ()=> {
        let starData = element.getAttribute('data-rating')
        let starValue = parseInt(starData)
        console.log(typeof starValue);

        let submitContainer = document.getElementById("submitRate")
        submitContainer.value = starValue
        console.log(submitContainer.value, typeof submitContainer.value);
        console.log(submitContainer.value, typeof parseInt(submitContainer.value));

    })
})

// // Boucle pour parcourir chaque élément du groupe afin d'ajouter un event lorsqu'on clique dessus
// starElements.forEach(function(element){
//     element.addEventListener("click", ()=> {
//         console.log('hello');
//         // Récup' des étoiles individuelles
//         const starElement2 = document.getElementById("star-rate2")
//         const starElement3 = document.getElementById("star-rate3")
        
//         const starValueString1 = starElement1.getAttribute('data-rating')
//         const starValueString2 = starElement2.getAttribute('data-rating')
//         const starValueString3 = starElement3.getAttribute('data-rating')

//         // Conversion des étoiles en int
//         const starValue1 = parseInt(starValueString1)
//         const starValue2 = parseInt(starValueString2)
//         const starValue3 = parseInt(starValueString3)
//     })
// })




// La valeur int doit être renvoyé au controller 
