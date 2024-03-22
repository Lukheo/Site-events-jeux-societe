
function eventCheck(){
    // Récupération des valeurs des champs du formulaire
    const eventName = document.getElementById('eventName').value.trim();
    const eventDescription = document.getElementById('eventDescription').value.trim();
    const eventDate = document.getElementById('eventDate').value;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const eventTime = document.getElementById('eventTime').value.trim();
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const playersNumber = document.getElementById('playersNumber').value;
    const address = document.getElementById('address').value.trim();
    const addressRegex  = /^.{3,}$/;

    // Vérification du champ eventName
    if (!eventName || eventName.length < 2 || eventName.length > 20) {
        error("Le nom de l'évenement doit comporter entre 2 et 20 caractères", "eventName");
        return false;
    }

    // Vérification du champ eventDescription
    if (!eventDescription || eventDescription.length < 10 || eventDescription.length > 200) {
        error("La description de l'évenement doit être compris entre 10 et 200 caractères", "eventDescription");
        return false;
    }

    // Vérification du champ eventDate
    if (!eventDate || !dateRegex.test(eventDate)) {
        error("La date doit être valide", "eventDate");
        return false;
    }

    // Vérification du champ eventTime
    if (!eventTime || !timeRegex.test(eventTime)) {
        error("L'heure doit être au format 24heures", "eventTime");
        return false;
    }

     // Vérification du champ address
     if (!address || !addressRegex.test(address)) {
        error("L'addresse doit contenir au moins 3 caractères", "address");
        return false;
    }

    // Vérification du champ playersNumber
    if (isNaN(playersNumber) || playersNumber < 1 || playersNumber > 60) {
        error("Le nombre de joueur doit être compris entre 1 et 60", "playersNumber");
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