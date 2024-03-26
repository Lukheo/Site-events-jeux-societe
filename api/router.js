const express = require('express')
const router = express.Router()
const homeController = require('../api/controllers/homeController')
const userController = require('../api/controllers/userController')
const gameController = require('../api/controllers/gameController')
const eventController = require('../api/controllers/eventController')
const searchController = require('./controllers/searchController')
const categorieController = require('./controllers/categorieController')
const { body, param } = require('express-validator')

const isAdminMW = require("./middleware/isAdmin")
const authMW = require("./middleware/auth")
const authenticateUser = require('./middleware/authenticateUser')


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
            .isLength({ min: 8 }).withMessage('les données entrées sont incorrectes')
            .matches(/[a-z]/).withMessage('les données entrées sont incorrectes')
            .matches(/[A-Z]/).withMessage('les données entrées sont incorrectes')
            .matches(/[0-9]/).withMessage('les données entrées sont incorrectes')
            .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('les données entrées sont incorrectes')
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
    .post(
        body('email')
            .notEmpty().withMessage('L\'adresse e-mail est requise')
            .isEmail().withMessage('L\'adresse e-mail n\'est pas valide')
            .trim(),
        body('password')
            .notEmpty().withMessage('Le mot de passe invalide')
            .trim()
    ,userController.postLogin)


router.route('/user/logout')
    .get(userController.logout)




router.route('/user/read/:id')
    .get(userController.getAccount)


router.route('/user/unregister/:userId/:eventId')
    .get(userController.removeregister)


router.route('/user/update/:id')
.get(userController.update)


router.route('/user/delete/:id')



router.route('/user/list')
    .get(userController.list)

//<---------  Game Routes   ----------->

router.route('/game/read/:id')
    .get(gameController.read);

router.route('/game/list')
    .get(gameController.list)

router.route('/game/read/:id')
    .get(gameController.read)

router.route('/game/create')
    .get(gameController.createGame)
    .post(
        body('gameName')
            .exists().trim()
            .isLength({ min: 2, max: 50 }).withMessage('les données entrées sont incorrectes.')
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .escape(),

        body('gameDescription')
            .exists().trim()
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .isLength({ max: 400 }).withMessage('Le contenu incorrect')
            .escape(),

        body('playerNumber')
            .isInt({ min: 1, max: 60 }).withMessage('Nombre de joueur incorrect')
        ,
        gameController.postGame)

router.route('/game/rate/')
    .post(gameController.rate)

router.route('/game/page/:id')
    .get(gameController.getGameDetail)

router.route('/game/update/:id')
    .get(gameController.getGameUpdate)
    .post([
        // utilisation du middleware pour n'autoriser la modification qu'à l'admin
        body('gameName')
            .exists().trim()
            .isLength({ min: 2, max: 50 }).withMessage('les données entrées sont incorrectes')
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .escape(),

        body('gameDescription')
            .exists().trim()
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .isLength({ max: 400 }).withMessage('Contenu incorrect')
            .escape(),

        body('playerNumber')
            .isInt({ min: 1, max: 60 }).withMessage('Nombre de joueurs incorrect')
        ,
    ], gameController.postGameUpdate)



router.route('/game/delete/:id')
    .post(gameController.gameDelete)

//<-----------  Event Routes   ----------->

router.route('/event/create')
    .get(eventController.createEvent)
    .post(
        body('eventName')
            .exists().trim()
            .isLength({ min: 2, max: 20 }).withMessage('Les données entrées sont incorrectes')
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .escape(),

        body('eventDescription')
            .exists().trim()
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .isLength({ max: 200 }).withMessage('Le contenu incorrecte')
            .escape(),

        body('eventDate')
            .isDate().withMessage('la date invalide')
            .notEmpty().withMessage('Une date est requise'),

        body('eventTime')
            .isTime({ hourFormat: 'hour24' })
            .withMessage('heure de l\'événement incorrecte'),

        body('playersNumber')
            .isInt({ min: 1, max: 60 }).withMessage('Le nombre de joueurs incorrect')
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
            .isLength({ min: 2, max: 20 }).withMessage('les données entrées sont incorrectes')
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .escape(),

        // Middleware de validation pour description de l'event
        body('eventDescription')
            .exists().trim()
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .isLength({ max: 200 }).withMessage('Le contenu incorrecte')
            .escape(),

        // Middleware de validation pour la date de l'event
        body('eventDate')
            .isDate().withMessage('la date invalide')
            .notEmpty().withMessage('Ce champ ne doit pas être vide'),
        // Middleware de validation pour l'heure de l'event
        body('eventTime')
            .isTime({ hourFormat: 'hour24' })
            .withMessage('L\'heure de l\'événement est incorrecte'),
        // Middleware de validation pour le nombre de joueur de l'event
        body('playersNumber')
            .isInt({ min: 1, max: 60 }).withMessage('Le nombre de joueurs incorrecte.'),
        body('address').exists().trim()
            .notEmpty().withMessage('L\'adresse est obligatoire')

    ], eventController.postUpdate);

router.route('/event/delete/:id')
    .post(eventController.eventDelete)

router.route('/event/:id/places')
    .get(eventController.getAvailablePlaces)

router.route('/event/:id/register')
    .post(authMW, eventController.registerUserToEvent)


    router.route('/event/registrated/users')
    .get(eventController.getRegistratedUsers)
router.route('/event/:eventId/user/:userId/delete')
    .post(eventController.deleteRegistratedUsers)

    



//<---------  Search Routes   ----------->
router.route('/search')
    .get(searchController.search)

router.route('/search/results')
    .post(searchController.search)


//<-----------  Categories Routes   ----------->

router.route('/category/create')
    .get(categorieController.createCat)
    .post([
        body('catName')
            .exists().trim()
            .isLength({ min: 2, max: 20 }).withMessage('Contenu incorrecte')
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .escape()],
        categorieController.postCat)

router.route('/category/list')
    .get(categorieController.listCat)

router.route('/category/update/:id')
    .get(categorieController.getCatUpdate)
    .post([
        body('catName')
            .exists().trim()
            .isLength({ min: 2, max: 20 }).withMessage('Contenu incorrecte')
            .notEmpty().withMessage('Ce champ ne doit pas être vide.')
            .escape()],
        categorieController.postCatUpdate)

router.route('/category/delete/:id')
    .post(categorieController.catDelete)
//<-----------  FAQ Routes   ----------->

router.route('/FAQ')
    .get(homeController.faq)



module.exports = router