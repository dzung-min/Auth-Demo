module.exports = (req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.successMessage = req.flash('success')
  res.locals.failureMessage = req.flash('error')
  next()
}
