const request = require('supertest')
const jwt = require('jwt-simple')
const config = require('../config')

const app = require('../server').app

describe('registration', () => {
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

  it('should register a user with appropriate parameters', (done) => {
    request(app)
      .post('/register')
      .send({
        username: 'someUsername5',
        password: 'somePassword5'
      })
      .expect(200)
      .end(done)
  })
})

describe('login', () => {
  it('should not allow user to login if token is missing or invalid', (done) => {
    request(app)
      .post('/login')
      .set('Authorization', '00')
      .expect(401)
      .end(done)
  })

  it('should allow user to login if token is correct', (done) => {
    request(app)
      .post('/login')
      .set('Authorization', 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfX3YiOjAsInNhbHQiOiIyMDdlMTE3ODk1NTljODBkNWJjNDhkMmVjOTZlMTY0OWM2ZDNjMmU1NjFlNTJjYmU2ZDZkMTgwZWI3NTNmMjY1IiwiaGFzaCI6IjM3YzBlZDI4YTg1M2QxOGI4Yjc0NzBlNzc0MGViNDlmN2FmMGY1ZWE3NTU0MTBhYTJlYzdjYjYwM2ExYmJiYzVmN2U4OTZkZDQ5ZTMxNzNhZDI1MDIyZDcyZDZmOGZiYjliMjVhM2M2ZGY0YWJjNzZmZDEzNzIxZjllOTcwNWRhYTM4ODNkNjg4YzNhMjk4MWU4N2JlMWRkNzdkOTk2OTE5ZmVhMzRjNzYxNDg3YTM0NjAzZGQyY2E4NWFkM2JlNDI5Yjk5YjQyZWUzMTE1NDZhZDE2MDdjMTc0NDNiMzJkZTc1NDMzYzhjOGZiNGNhZTRkODU4YTNhZGUxZDE5MjJiNDkyODc5NTQwM2IzZWM0M2JmYjI0YmFmZDM3YjYyYzYwMDgxODU0NzQzYzAyZjNiOGU4MDFjMTBiZWUzMWE0OTUwNDBlZDFmZDU1YTMyZTVmZTAzYzgwNTc0NmUyZWJlMmNiZmY1YThhNzg0MzEwNDU4MWNhMDJiZjQ2MTc1Nzc5MTM3OWYzMjY3ODdhZGRiNDE1NzFmNzA2ZDU5MmFmN2U4ZWU2MDk0OWJkYjg5YjBlZGQzNGViMmEzNzZlZmM1MjBjZWFkNDhkNmE0ZDc5ZDdmZTdiZmZjZDcwZDIyNDBkY2NlZDVjOGM2ZGRkYzhmYmFhNjUzYjhiOWQwZWI2NmRkMWExNzFjYmRiYTdjOTJjYzZlMjdiMjFlMTVkYjM1MGQyMjExNzkwYjczN2RjZmUxMDEzMzgzZWE4YzY4MGQ0MTQ0ODcwMTE4MTFlZDk1ZTBkNDYwM2Q1NDg0NWVhNjZiYTUzN2Y5Yzk1M2ZmMGMyOTEyODdkY2Q3YWZjOWRiNGZkYjRkYjA0MWJjZDYzMWQ1NDM4MzgxZGViNDQ4OTcyNGUzNWYzZGFjZjI5YjQ4MWRjMmJlZmVlMTczZDUzM2FmZjFhODZjM2I2MGJjOWJlNjhkYjFkNDhlZjYyYTc3NjhlZmRiZjdkMWE2OWY2YTU1ZTliNzI5MzMxNTBjNWRmOWYyYTA3ZDQ2OWFkZmM1MjMwODE4ZjMyNWNmZDA2M2NmZTQxYjZkZmFlODhmZDNlMDk1OWM5YmYyMmExOTEwZWM5ZjhmMDFmN2E1NjM0ODY1YWVlYTc2Y2I5MDhmMzZhMTk3ODNmYmM3MzUyNGI2MTVhODFiMWE5MWFkYzdkNTU1NTNlZDEyNDQwYTlhZGFlZjE5MGI0Yzc2OGJiOTk1YjJmYzRjZjhlZDAyODk0NDZlOGM0MDUzZDdlZWU4ODE4M2YwMDFkMWYwOTgzODkzZTEzNWZiYjRiNzU5N2NlMTA5YWNjYzUzOTVmMmIxNjQxNDA4MmQyMTc5NTk4M2YiLCJ1c2VybmFtZSI6ImJsYWgiLCJfaWQiOiI1OGZiOWRiMzUzZDI1ZjE3NjhmN2Q2MGQifQ.xVDcaqInfRXcEGg6ZfWGljdt6iYn5lAPAIWC9jF_RW8')
      .expect(200)
      .end(done)
  })
})
