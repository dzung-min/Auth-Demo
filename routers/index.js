const passport = require('passport')
const router = require('express').Router()

const usersRouter = require('./users')
const authRouter = require('./auth')
const campsRouter = require('./camps')

router.get('/', (req, res, next) => {
  res.render('index')
})

router.use('/auth', authRouter)
router.use('/camps', campsRouter)
router.use('/users', usersRouter)

module.exports = router
