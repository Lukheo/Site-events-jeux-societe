const session = require('express-session')


let SequelizeStore = require("connect-session-sequelize")(session.Store);

const express = require('express')
const {engine} = require('express-handlebars')

const path = require('path')
const router = require('./api/router')
const config = require('./config')


const app = express()
const port = 3000


















app.use('/', router)


app.listen(port, () => {
  console.log(`Example app listening at 127.0.0.1:${port}`)
})