const createHttpError = require('http-errors')

module.exports = (req, res, next) => {
  next(createHttpError.NotFound())
}
