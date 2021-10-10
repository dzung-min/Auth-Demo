const passport = require('passport')

exports.renderSignInForm = (req, res) => {
  res.render('signin')
}

exports.signIn = passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You are logged in successfully',
  failureRedirect: '/auth/signin',
  failureFlash: true,
})

exports.renderSignUpForm = (req, res) => {
  res.render('signup')
}

exports.signOut = (req, res) => {
  req.logOut()
  req.flash('success', 'You are logged out successfully')
  res.redirect('/')
}
