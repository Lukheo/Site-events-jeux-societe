const express = require('express')
const router = express.Router()
const homeController = require('../api/controllers/homeController')
const userController = require('../api/controllers/userController')
const gameController = require('../api/controllers/gameController')
const eventController = require('../api/controllers/eventController')
const { body, param } = require('express-validator')

const isAdminMW = require("./middleware/isAdmin")
const authMW = require("./middleware/auth")


//<-----------  Home Routes   ----------->

router.route('/')
    .get(homeController.get)


//<-----------  Event Routes   ----------->

router.route('/events/list')
    .get(eventController.list)



router.route('/event/create')
    .get(eventController.createEvent)



router.route('/event/read/:id')



router.route('/event/update/:id')


//<-----------  User Routes   ----------->

router.route('/user/login')
    .get(userController.getLogin)
    .post(userController.postLogin)
    
router.route('/user/logout')
    .get(userController.logout)

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


router.route('/user/read/:id')
    .get(userController.getAccount)


router.route('/user/update/:id')


router.route('/user/delete/:id')



router.route('/user/list')
    .get(userController.list)


router.route('/game/read/')
    .get(gameController.list)

//<-----------  FAQ Routes   ----------->

router.route('/FAQ')
    .get(homeController.faq)

// router.route('/picture/update')
//     .post(gamepictureController.post)


module.exports = router