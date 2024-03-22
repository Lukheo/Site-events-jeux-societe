function gameCheck(){
    // Récupération des valeurs des champs du formulaire
    const catName = document.getElementById('catName').value.trim();

    // Vérification du champ catName
    if (!catName || catName.length < 2 || catName.length > 50) {
        error("Le nom de la catégorie doit comporter entre 2 et 50 caractères", "catName");
        return false;
    }
   
    // Toutes les validations ont réussi, donc on retourne true
    return true;
}

function resetErrors() {
    // Enlève les messages d'erreur précédents 
    const errors = document.querySelectorAll(".error");
    errors.forEach(message => message.remove());
}

function error(message, id) {
    //définit l'élément error 
    let error = document.createElement("span")
    error.className = "error"
    error.textContent = message

    //définit le champ auquel error est rattaché -- defines on which field error is attached
    document.getElementById(id).parentNode.appendChild(error)
}