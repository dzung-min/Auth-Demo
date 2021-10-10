const createHttpError = require('http-errors')

module.exports = (req, res, next) => {
  if (req.user.id.toString() === req.author_id.toString()) {
    return next()
  }
  next(createHttpError.Unauthorized())
}
