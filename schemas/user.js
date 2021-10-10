const Joi = require('joi')

module.exports = {
  create: Joi.object({
    name: Joi.string().trim().empty('').required().messages({
      'any.required': "User's name is required",
    }),
    email: Joi.string().trim().empty('').required().email().messages({
      'any.required': "User's email is required",
      'string.email': 'Email must be a valid email address',
    }),
    password: Joi.string().trim().empty('').required().min(8).messages({
      'any.required': "User's password is required",
      'string.min': 'Password must contains at least 8 characters',
    }),
  }),
}
