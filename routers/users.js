const router = require('express').Router()

const userController = require('../controllers/user')
const userSchema = require('../schemas/user')
const validate = require('../middlewares/validate')

router.route('/').post(validate(userSchema.create), userController.create)

module.exports = router
