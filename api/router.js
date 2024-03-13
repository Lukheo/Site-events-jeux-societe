const express = require('express')
const router = express.Router()
const homeController = require('../api/controllers/homeController')
const userController = require('../api/controllers/userController')
const gameController = require('../api/controllers/gameController')
const eventController = require('../api/controllers/eventController')
const { body, param } = require('express-validator')

const isAdminMW = require("./middleware/isAdmin")
const authMW = require("./middleware/auth")

router.route('/')
    .get(homeController.get)

router.route('/inscription')
    .get(userController.get)

router.route('/log_in')
    .get(userController.getLogin)


router.route('/events/list')
    .get(eventController.list)



router.route('/event/create')
    .get(eventController.createEvent)



router.route('/event/read/:id')



router.route('/event/update/:id')



router.route('/user/register')



router.route('/user/read/:id')
    .get(userController.getAccount)



router.route('/user/update/:id')



router.route('/user/delete/:id')



router.route('/game/read/')
    .get(gameController.list)


router.route('/FAQ')
.get(homeController.faq)


module.exports = router