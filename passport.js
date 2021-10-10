const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('./models/user')

passport.use(
  new LocalStrategy({ usernameField: 'email' }, function (
    username,
    password,
    done
  ) {
    User.findOne({ email: username }, function (err, user) {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect email and/or password.',
        })
      }
      const isPasswordMatch = bcrypt.compareSync(password, user.password)
      if (!isPasswordMatch) {
        return done(null, false, {
          message: 'Incorrect email and/or password.',
        })
      }
      return done(null, user)
    })
  })
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
