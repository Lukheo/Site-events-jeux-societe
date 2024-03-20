function userCreateCheck() {
    //récupération des données -- gathering all data
    let prenom = document.querySelector("#prenom").value.trim()
    let nom = document.querySelector("#nom").value.trim()
    let email = document.querySelector("#email").value.trim()
    let password = document.querySelector("#password").value.trim()
    let password2 = document.querySelector("#confPassword").value.trim()

    //création des vérifications en format regex -- declaring regular expressions for data checking
    let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
    let checkNom = /^.{2,}$/
    let checkMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    resetErrors()


    //chaîne de conditions pour vérifier le mot de passe -- if cascade to check the password validity
    if (password !== password2) {
        //si les deux mdp sont différents -- if password fields don't match
        console.log("diff");
        error("les deux mdp sont différents !", "confPassword")
        return false
    } else if (password.length < 8) {
        console.log("court");
        //si le mot de passe est inférieur à 8 caractères -- if the password is shorter than 8 characters
        error("le mot de passe choisi est trop court !", "password")
        return false
        
    }else if (!checkPassword.test(password)) {
        console.log("cond");
        //si le mot de passe ne vérifie pas au regex précédemment défini -- if password and regex don't match
        error("le mot de passe choisi ne remplit pas les conditions de sécurité !", "password")
        return false
    }else{
        //mot de passe valide -- password matches all conditions
        console.log("mdp ok");

        //vérification des valeurs -- Values checking
        if (!checkNom.test(prenom)) {
            console.log("prenom");
            // si le prénom ne correspond pas au regex -- if first name's value doesn't correspond to the regex
            error("le prénom n'est pas valide !", "prenom")
            return false
        }else if (!checkNom.test(nom)) {
            console.log("nom");
            // si le nom ne correspond pas au regex -- if surname's value doesn't correspond to the regex
            error("le nom n'est pas valide !", "nom")
            return false
        }else if (!checkMail.test(email)) {
            console.log("email");
            error("l'adresse mail n'est pas valide !", "email")
            return false
        }else{
            console.log("bravo");
            return true
        }

    }

}

function resetErrors() {
    // Enlève les messages d'erreur précédents -- remove already existing error messages
    const errors = document.querySelectorAll(".error");
    errors.forEach(message => message.remove());
}

function error(message, id) {
    //définit l'élément error -- defines the error element to display correctly the error message
    let error = document.createElement("span")
    error.className = "error"
    error.textContent = message

    //définit le champ auquel error est rattaché -- defines on which field error is attached
    document.getElementById(id).parentNode.appendChild(error)
}