function gameCheck(){
    // Récupération des valeurs des champs du formulaire
    const gameName = document.getElementById('gameName').value.trim();
    const gameDescription = document.getElementById('gameDescription').value.trim();
    const playerNumber = document.getElementById('playerNumber').value;
    const imgUrl = document.getElementById('imgGame').value.trim();



    resetErrors()
    // Vérification du champ gameName
    if (!gameName || gameName.length < 2 || gameName.length > 50) {
        error("Le nom du jeu doit comporter entre 2 et 50 caractères", "gameName");
        return false;
    }

    // Vérification du champ gameDescription
    if (!gameDescription || gameDescription.length < 10 || gameDescription.length > 400) {
        error("La description du jeu doit être compris entre 10 et 200 caractères", "gameDescription");
        return false;
    }

    // Vérification du champ playerNumber
    if (isNaN(playerNumber) || playerNumber < 1 || playerNumber > 60) {
        error("Le nombre de joueur doit être compris entre 1 et 60", "playerNumber");
        return false;
    }

    // Vérification du champ imgUrl
    if (!imgUrl || imgUrl.length < 10 || imgUrl.length > 400) {
        error("La description de l'évenement doit être compris entre 10 et 200 caractères", "eventDescription");
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