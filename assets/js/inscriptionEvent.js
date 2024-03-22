
//  async function incriptionEvent(eventId) {
//     try {
//         // Récupérer l'ID de l'événement à partir de l'attribut data
//         // const eventId = this.getAttribute('data-event-id');
        
//         // Effectuer la requête AJAX pour s'inscrire à l'événement
//         const response = await fetch(`http://127.0.0.1:3000/event/${eventId}/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': '45cde5634be77da412855e860ee90a3296dbc8e0ce7542dbbe37b6dbdb92967c' // Assurez-vous d'avoir le token d'authentification
//             }
//         });

//         if (response.ok) {
//             // Inscription réussie
//             console.log("Inscription réussie à l'événement.");
//         } else {
//             // Gérer les erreurs de l'inscription
//             const data = await response.json();
//             console.error("Erreur lors de l'inscription à l'événement :", data.message);
//         }
//     } catch (error) {
//         console.error("Une erreur s'est produite lors de l'inscription à l'événement :", error);
//     }
// };
