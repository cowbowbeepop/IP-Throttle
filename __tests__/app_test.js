const app = require('../app_test')
const supertest = require('supertest')
const request = supertest(app)

it('tests requests more than 10 in a minute', async done => {
  const start = new Date()
  const REQUEST_LIMIT = 10

  for (let i = 0; i < REQUEST_LIMIT; i++) {
    const response = await request.get('/get/data')  

    if (i < REQUEST_LIMIT && Date.now() - start <= 60000) {
      expect(response.status).toBe(200)
    }

    if (i == 10 && Date.now() - start > 60000) {
      expect(response.status).toBe(404)
    }
  }
  done()
})