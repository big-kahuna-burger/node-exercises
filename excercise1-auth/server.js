'use strict'

// module imports
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
// FOR SERVER RENDERED const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// local imports
const config = require('./config')
const User = require('./models/user')

// configuration
const app = express()

// jwt configuration
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
opts.secretOrKey = config.secret

mongoose.connect(config.database)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

// passport
app.use(passport.initialize())

passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
  User.findOne({id: jwtPayload.id}, function (err, user) {
    if (err) {
      return done(err, false)
    }
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
}))
// FOR SERVER RENDERED passport.use(new LocalStrategy(User.authenticate()))

// routes
require('./routes')(app)

app.listen(3000, () => {
  console.log('Server started at port 3000')
})

module.exports.app = app
