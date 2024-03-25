function loginCheck() {
    //récupération des données -- gathering all data
   
    let email = document.querySelector("#email").value.trim()
    let password = document.querySelector("#password").value.trim()
   

    //création des vérifications en format regex -- declaring regular expressions for data checking
    let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
    let checkMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    resetErrors()
    
    // vérifier si l'email existe --  check if email exists
    if(!email){
        error("Le mail est requis", "email")
    } else if(!checkMail.test(email)){
         // vérifier si l'email est valide --  check if email is valid
         error("Le mail n'est pas valide", "email")
    }
    
    // vérifier le mot de passe existe --  check if the password exists
    if (!password) {
        error("Le mot passe est requis", "password")
          return false
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