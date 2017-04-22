const passport = require('passport')
const jwt = require('jwt-simple')

const User = require('./models/user')
const config = require('./config')

module.exports = function (app) {
  app.post('/register', function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
      if (err) {
        return res.json({ success: false })
      }

      const token = jwt.encode(user, config.secret)
      return res.json({ success: true, token: token })
    })
  })

  app.post('/login', passport.authenticate('jwt', { session: false }),
    function (req, res) {
      let token = req.headers.authorization.split(' ')[1]
      const user = jwt.decode(token, config.secret)
      res.send({user: user})
    }
  )
}
