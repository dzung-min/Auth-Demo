const router = require('express').Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/tmp/my-uploads'))
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniquePrefix + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage })

const campCtrl = require('../controllers/camp')
const campSchema = require('../schemas/camp')
const validate = require('../middlewares/validate')
const requireSignIn = require('../middlewares/requireSignIn')
const hasAuthorization = require('../middlewares/hasAuthorization')

router
  .route('/')
  .get(campCtrl.list)
  .post(
    upload.single('represent_photo'),
    requireSignIn,
    validate(campSchema),
    campCtrl.create
  )
router.route('/new').get(requireSignIn, campCtrl.renderCreateForm)
router
  .route('/:id/edit')
  .get(requireSignIn, hasAuthorization, campCtrl.renderUpdateForm)
router
  .route('/:id')
  .get(campCtrl.renderCampDetail)
  .patch(requireSignIn, hasAuthorization, validate(campSchema), campCtrl.update)
  .delete(requireSignIn, hasAuthorization, campCtrl.remove)
router.param('id', campCtrl.loadById)

module.exports = router
