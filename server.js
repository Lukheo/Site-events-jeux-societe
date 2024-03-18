const session = require('express-session')


let SequelizeStore = require("connect-session-sequelize")(session.Store);

const express = require('express')
const { engine } = require('express-handlebars')

const path = require('path')
const router = require('./api/router')
const config = require('./config')


const app = express()
const port = 3000



app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        ifCond: function (v1, v2, option) {
            if (v1 === v2) {
                return option.fn(this)
            }
            return option.inverse(this)
        }
    }
}))
app.set('view engine', 'hbs')

app.use('/css', express.static(path.join(__dirname, 'assets/css')))
app.use('/js', express.static(path.join(__dirname, 'assets/js')))
app.use('/pictures', express.static(path.join(__dirname, 'views/pictures')))


try {
    config.sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);




app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new SequelizeStore({ db: config.sequelize })
}))

app.use('*', (req, res, next) => {
    if (req.session.prenom) {
        res.locals.prenom = req.session.prenom
        if (req.session.isAdmin) {
            res.locals.isAdmin = true
        }
    }
    next()
})




app.use('/', router)


app.listen(port, () => {
    console.log(`Example app listening at 127.0.0.1:${port}`)
})