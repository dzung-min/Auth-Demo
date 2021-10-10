const Joi = require('joi')

module.exports = Joi.object({
  title: Joi.string().trim().empty('').required().messages({
    'any.required': "Camp's title is required",
  }),
  location: Joi.string().trim().empty('').required().messages({
    'any.required': "Camp's location is required",
  }),
  description: Joi.string().trim().empty(''),
  represent_photo: Joi.string().trim().empty('').uri().messages({
    'string.uri': "Photo's must be a valid url",
  }),
})
