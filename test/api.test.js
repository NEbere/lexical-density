// Third party imports
const chai = require('chai')
const chaiHttp = require('chai-http')

// Local imports
const server = require('../app')
const { errorLogger } = require('../utils/logger')
const { longSentence, shortSentence, sentences } = require('./mockData')
const { STATUS_CODES } = require('../utils')
// const { setupFixtures, cleanup } = require('./testUtil')

const expect = chai.expect
chai.use(chaiHttp)

describe('==== Unit Tests ====', function () {
  describe('==== Health Check endpoint test ====', function () {
    it('Should test the health check route', (done) => {
      chai.request(server)
        .get(`/_health`)
        .end(async (err, res) => {
          if (err) {
            errorLogger('Error running health request', err)
          }
          expect(STATUS_CODES.OK)
          expect(res.body).to.an('object')
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('OK')
          done()
        })
    })
  })

  describe('==== API endpoints test ====', function () {
    // let fixtures
    // beforeEach(async () => {
    //   fixtures = await setupFixtures(testUsers, testMusic)
    // })
    // afterEach(() => cleanup())
    it('Should return an error for short sentence on /complexity route', (done) => {
      chai.request(server)
        .post('/complexity')
        .send({ words: shortSentence })
        .end((err, res) => {
          if (err) {
            errorLogger('Error adding music to user playlist', err)
          }
          expect(STATUS_CODES.BAD_REQUEST)
          const response = res.body
          console.log(response, 'response')
          expect(response).to.an('object')
          expect(response).to.have.property('message')
          expect(response.message).to.equal('Input must be more than 1000 characters')
          done()
        })
    })

    it('Calculate complexity with /complexity route', (done) => {
      chai.request(server)
        .post('/complexity')
        .send({ words: longSentence })
        .end((err, res) => {
          if (err) {
            errorLogger('Error adding music to user playlist', err)
          }
          expect(STATUS_CODES.OK)
          const response = res.body
          console.log(response, 'response')
          expect(response).to.an('object')
          expect(response).to.have.property('data')
          expect(response.data).to.have.property('overall_ld')
          done()
        })
    })

    it('Should calculate lexical density of the text broken down into sentences. using /complexity?mode=verbose', (done) => {
      chai.request(server)
        .post('/complexity?mode=verbose')
        .send({ words: sentences })
        .end((err, res) => {
          if (err) {
            errorLogger('Error adding music to user playlist', err)
          }
          expect(STATUS_CODES.OK)
          const response = res.body
          console.log(response, 'response')
          expect(response).to.an('object')
          expect(response).to.have.property('overall_ld')
          expect(response).to.have.property('sentence_ld')
          expect(response.sentence_ld).to.an('array')
          done()
        })
    })
  })
})
