const session = require('express-session')


let SequelizeStore = require("connect-session-sequelize")(session.Store);

const express = require('express')
const { engine } = require('express-handlebars')

const path = require('path')
const router = require('./api/router')
const config = require('./config')


const app = express()
const port = 3000









try {
    config.sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);








app.use('/', router)


app.listen(port, () => {
    console.log(`Example app listening at 127.0.0.1:${port}`)
})