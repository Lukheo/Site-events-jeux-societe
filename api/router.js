const express = require('express')
const router = express.Router()
const homeController = require('../api/controllers/homeController')
const userController = require('../api/controllers/userController')
const gameController = require('../api/controllers/gameController')
const eventController = require('../api/controllers/eventController')
const searchController = require('./controllers/searchController')
const { body, param } = require('express-validator')

const isAdminMW = require("./middleware/isAdmin")
const authMW = require("./middleware/auth")


//<-----------  Home Routes   ----------->

router.route('/')
    .get(homeController.get)

//<-----------  User Routes   ----------->

router.route('/user/register')
    .get(userController.get)
    .post([
        body('prenom')
            .isLength({ min: 4 })
            .notEmpty().withMessage('Le prénom d\'utilisateur est requis')
            .trim(),
        body('nom')
            .isLength({ min: 2 })
            .notEmpty().withMessage('Le nom d\'utilisateur est requis')
            .trim(),
        body('email')
            .notEmpty().withMessage('L\'adresse e-mail est requise')
            .isEmail().withMessage('L\'adresse e-mail n\'est pas valide')
            .trim(),
        body('password')
            // .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères')
            // .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule')
            // .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
            // .matches(/[0-9]/).withMessage('Le mot de passe doit contenir au moins un chiffre')
            // .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial')
            .custom((value, { req }) => {
                if (value !== req.body.confPassword) {
                    throw new Error('Les mots de passe ne correspondent pas');
                }
                return true;
            })
            .trim(),
    ], userController.post);


router.route('/user/login')
    .get(userController.getLogin)
    .post(userController.postLogin)


router.route('/user/logout')
    .get(userController.logout)




router.route('/user/read/:id')
    .get(userController.getAccount)


router.route('/alarm/:id')
    .get(userController.addalarm)


router.route('/user/update/:id')


router.route('/user/delete/:id')



router.route('/user/list')
    .get(userController.list)

//<---------  Game Routes   ----------->

router.route('/game/read/:id')
    .get(gameController.read);

router.route('/game/list')
    .get(gameController.list)

router.route('/game/create')
    .get(gameController.createGame)
    .post(
        body('gameName')
            .exists().trim()
            .isLength({ min: 2, max: 20 }).withMessage('Le champ doit contenir plus de deux caractères.')
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .escape(),

        body('gameDescription')
            .exists().trim()
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .isLength({ max: 400 }).withMessage('Le contenu ne doit pas être supérieur à 400 caractères')
            .escape(),

        body('playerNumber')
            .isInt({ min: 1, max: 12 }).withMessage('Le nombre de joueurs doit être compris entre 1 et 12.')
        ,
        gameController.postGame)

router.route('/game/rate')
    .post(gameController.rate)

router.route('/game/page/:id')
    .get(gameController.getGameDetail)


//<-----------  Event Routes   ----------->


router.route('/event/create')
    .get(eventController.createEvent)
    .post(
        body('eventName')
            .exists().trim()
            .isLength({ min: 2, max: 20 }).withMessage('Le champ doit contenir plus de deux caractères ou moins')
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .escape(),

        body('eventDescription')
            .exists().trim()
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .isLength({ max: 200 }).withMessage('Le contenu ne doit pas être supérieur à 200 caractères')
            .escape(),

        body('eventDate')
            .isDate().withMessage('la date doit être valide')
            .notEmpty().withMessage('Vous devez choisir une date'),

        body('eventTime')
            .isTime({ hourFormat: 'hour24' })
            .withMessage('L\'heure de l\'événement doit être au format 24 heures.'),

        body('playersNumber')
            .isInt({ min: 1, max: 12 }).withMessage('Le nombre de joueurs doit être compris entre 1 et 12.')
        ,
        eventController.postEvent)


router.route('/events/list')
    .get(eventController.list)

router.route("/event/read/:id")
    .get([
        param('id').exists().withMessage("L'identifiant de l'événement est requis.")
    ], eventController.read);

router.route('/event/update/:id')
    .get(eventController.getEventUpdate)
    .post([
        // Middleware de validation pour le titre de l'event
        body('eventName')
            .exists().trim()
            .isLength({ min: 2, max: 20 }).withMessage('Le champ doit contenir plus de deux caractères ou moins')
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .escape(),

        // Middleware de validation pour description de l'event
        body('eventDescription')
            .exists().trim()
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .isLength({ max: 200 }).withMessage('Le contenu ne doit pas être supérieur à 200 caractères')
            .escape(),

        // Middleware de validation pour la date de l'event
        body('eventDate')
            .isDate().withMessage('la date doit être valide')
            .notEmpty().withMessage('Vous devez choisir une date'),
        // Middleware de validation pour l'heure de l'event
        body('eventTime')
            .isTime({ hourFormat: 'hour24' })
            .withMessage('L\'heure de l\'événement doit être au format 24 heures.'),
        // Middleware de validation pour le nombre de joueur de l'event
        body('playersNumber')
            .isInt({ min: 1, max: 12 }).withMessage('Le nombre de joueurs doit être compris entre 1 et 12.'),
        body('address').exists().trim()
            .notEmpty().withMessage('L\'adresse est obligatoire')

    ], eventController.postUpdate);


router.route('/event/delete/:id')
    .post(eventController.eventDelete)



//<---------  Search Routes   ----------->
router.route('/search')
    .get(searchController.search)

router.route('/search/results')
    .post(searchController.search)






//<-----------  FAQ Routes   ----------->

router.route('/FAQ')
    .get(homeController.faq)



module.exports = router