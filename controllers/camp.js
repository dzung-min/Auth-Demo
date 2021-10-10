const asyncHandler = require('express-async-handler')
const createHttpError = require('http-errors')
const { isValidObjectId } = require('mongoose')

const Camp = require('../models/camp')

exports.renderCreateForm = (req, res) => {
  res.render('camps/new')
}

exports.create = asyncHandler(async (req, res, next) => {
  const camp = new Camp(req.body)
  camp.user_id = req.user._id
  camp.represent_photo = req.file.filename
  await camp.save()
  res.redirect('/camps')
})

exports.list = asyncHandler(async (req, res, next) => {
  const camps = await Camp.find()
  res.render('camps/list', { camps })
})

exports.loadById = asyncHandler(async (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return next(createHttpError.BadRequest("Invalid camp's id"))
  }
  const camp = await Camp.findById(req.params.id)
  if (!camp) {
    return next(
      createHttpError.NotFound(`Can not found camp with id: ${req.params.id}`)
    )
  }
  req.camp = camp
  req.author_id = camp.user_id
  next()
})

exports.renderCampDetail = (req, res) => {
  res.render('camps/detail', { camp: req.camp })
}

exports.renderUpdateForm = (req, res) => {
  res.render('camps/edit', { camp: req.camp })
}

exports.update = asyncHandler(async (req, res, next) => {
  const { camp } = req
  const updates = ['title', 'location', 'description', 'represent_photo']
  for (const update of updates) {
    camp[update] = req.body[update]
  }
  await camp.save()
  res.redirect(`/camps/${camp._id}`)
})

exports.remove = asyncHandler(async (req, res, next) => {
  const { camp } = req
  await camp.remove()
  res.redirect('/camps')
})
