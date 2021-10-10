const createHttpError = require('http-errors')

module.exports = (req, res, next) => {
  if (!req.user) {
    return next(createHttpError.Unauthorized())
  }
  next()
}
