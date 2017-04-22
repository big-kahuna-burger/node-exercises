module.exports = {
  secret: process.env.SECRECT || 'not so secret',
  database: process.env.MONGO || 'localhost:27017'
}
