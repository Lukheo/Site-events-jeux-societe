
 function eventCheck(){

    const eventName = document.getElementById('eventName').value.trim();
    const eventDescription = document.getElementById('eventDescription').value.trim();
    const eventDate = document.getElementById('eventDate').value;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const eventTime = document.getElementById('eventTime').value.trim();
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
    const playersNumber = document.getElementById('playersNumber').value;
    const address = document.getElementById('address').value.trim();
    const addressRegex  = /^.{3,}$/

    if (!eventName || eventName.length < 2 || eventName.length > 20) {
        let error = document.createElement("div")
        error.classList.add("error-message")
        error.setAttribute("id", "error-message")
        error.textContent = " Le nom de l\'événement doit contenir entre 2 et 20 caractères.";
        document.querySelector(".form").appendChild(error)
        return
    } 

    if (!eventDescription || eventDescription.length < 10 || eventDescription.length > 200){
        let error = document.createElement("div")
        error.classList.add("error-message")
        error.setAttribute("id", "error-message")
        error.textContent = " La description de l\'événement doit contenir entre 10 et 200 caractères.";
        document.querySelector(".form").appendChild(error)
        return
    }
    if (!eventDate || !dateRegex.test(eventDate)){
        let error = document.createElement("div")
        error.classList.add("error-message")
        error.setAttribute("id", "error-message")
        error.textContent = " Vous devez entrer une date valide";
        document.querySelector(".form").appendChild(error)
        return

    }
    if (!eventTime || !timeRegex.test(eventTime)){
        let error = document.createElement("div")
        error.classList.add("error-message")
        error.setAttribute("id", "error-message")
        error.textContent = " Vous devez entrer une heure valide";
        document.querySelector(".form").appendChild(error)
        return
    }
    if(isNaN(playersNumber) || playersNumber < 1 || playersNumber > 60){
        let error = document.createElement("div")
        error.classList.add("error-message")
        error.setAttribute("id", "error-message")
        error.textContent = " le nombre de joueur doit être entre 1 et 60";
        document.querySelector(".form").appendChild(error)
        return
    }
    if(!address || !addressRegex.test(address)){

        let error = document.createElement("div")
        error.classList.add("error-message")
        error.setAttribute("id", "error-message")
        error.textContent = " Vous devez entrer une adresse valide";
        document.querySelector(".form").appendChild(error)
        return
    }
    
    return true;
 }

