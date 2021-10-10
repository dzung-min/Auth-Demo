const createHttpError = require('http-errors')

/**
 *
 * @param {import('joi').Schema} schema
 * @returns {import('express').Handler}
 */
module.exports = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  })

  if (error) {
    const message = error.details.map((e) => e.message).join('. ')
    return next(createHttpError.BadRequest(message))
  }

  req.body = value
  next()
}
