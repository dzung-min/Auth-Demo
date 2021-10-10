const asyncHandler = require('express-async-handler')
const createHttpError = require('http-errors')

const User = require('../models/user')

exports.create = asyncHandler(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email })
  if (existingUser) {
    return next(createHttpError.Conflict('User is already exist'))
  }
  const user = await User.create(req.body)
  req.login(user, function (err) {
    if (err) {
      return next(err)
    }
    req.flash('success', 'You have been signed up successfully')
    return res.redirect('/')
  })
})
