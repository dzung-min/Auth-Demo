const router = require('express').Router()

const authCtrl = require('../controllers/auth')

router.route('/signin').get(authCtrl.renderSignInForm).post(authCtrl.signIn)
router.route('/signup').get(authCtrl.renderSignUpForm)
router.route('/signout').get(authCtrl.signOut)

module.exports = router
