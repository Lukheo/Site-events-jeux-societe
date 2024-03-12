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


router.route('/events/list')



router.route('/event/create')



router.route('/event/read/:id')



router.route('/event/update/:id')



router.route('/user/register')



router.route('/user/read/:id')



router.route('/user/update/:id')



router.route('/user/delete/:id')



router.route('/game/read/:id')


router.route('/FAQ')
.get(homeController.faq)


module.exports = router