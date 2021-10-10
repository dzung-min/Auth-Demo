const express = require('express')
const layouts = require('express-ejs-layouts')
const morgan = require('morgan')
const helmet = require('helmet')
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const methodOverride = require('method-override')

require('./mongodb')
require('./passport')

const config = require('./config')
const routers = require('./routers')
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')
const getUserInfo = require('./middlewares/getUserInfo')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(
  session({
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: config.sessionDb,
    }),
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(layouts)
app.use(helmet())
app.use(flash())
app.use(methodOverride('_method'))

app.use(getUserInfo)
app.use(routers)
app.use(notFound)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`)
})
