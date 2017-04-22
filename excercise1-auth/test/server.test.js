process.env.NODE_ENV = 'test'
const request = require('supertest')
const jwt = require('jwt-simple')
const config = require('../config')

const app = require('../server').app

describe('Auth', () => {
  it('should reject registration without appropriate parameters', (done) => {
    request(app)
      .post('/register')
      .send({
        username: '',
        password: ''
      })
      .expect(422)
      .expect({
        message: 'Please provide username and password'
      })
      .end(done)
  })

  const registerRequest = {
    username: `${new Date().getMilliseconds()}someUsername5`,
    password: `${new Date().getMilliseconds()}somePassword5`
  }
  it('should register a user with appropriate parameters', (done) => {

    request(app)
      .post('/register')
      .send(registerRequest)
      .expect(200)
      .end(done)
  })

  it('should not allow user to login if token is missing or invalid', (done) => {
    request(app)
      .post('/login')
      .set('Authorization', '00')
      .expect(401)
      .end(done)
  })

  it('should allow user to login if token is correct', (done) => {
    const token = jwt.encode(JSON.stringify(registerRequest), config.secret, 'HS256')
    request(app)
      .post('/login')
      .set('Authorization', `JWT ${token}`)
      .expect(200)
      .end(done)
  })
})
