// Third party imports
const chai = require('chai')
const chaiHttp = require('chai-http')
var sinon = require('sinon')
// var mongoose = require('mongoose')
require('sinon-mongoose')

// Local imports
const server = require('../app')
const { errorLogger } = require('../utils/logger')
const { longSentence, shortSentence, sentences } = require('./mockData')
const { STATUS_CODES } = require('../utils')
const NonLexicalWordsModel = require('../models').nonlexicalwordsModel
const words = ['to', 'got', 'is', 'have', 'and', 'although', 'or']

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
    it('Should return an error for short sentence on /complexity route', (done) => {
      chai.request(server)
        .post('/complexity')
        .send({ words: shortSentence })
        .end((err, res) => {
          if (err) {
            errorLogger('Error calculating complexity', err)
          }
          expect(STATUS_CODES.BAD_REQUEST)
          const response = res.body
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
            errorLogger('Error computing complexity', err)
          }
          expect(STATUS_CODES.OK)
          const response = res.body
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
            errorLogger('Error processing request', err)
          }
          expect(STATUS_CODES.OK)
          const response = res.body
          expect(response).to.an('object')
          expect(response).to.have.property('overall_ld')
          expect(response).to.have.property('sentence_ld')
          expect(response.sentence_ld).to.an('array')
          done()
        })
    })
  })

  describe('==== Database test - MongoDB and the non-lexical words endpoints ====', function () {
    it('Should create an array of nonlexical words', (done) => {
      const lexicalWordsMock = sinon.mock(new NonLexicalWordsModel({ title: 'nonLexicalWords', words: words }))
      const lexicalWords = lexicalWordsMock.object
      const expectedResult = { status: true }
      lexicalWordsMock.expects('save').yields(null, expectedResult)

      lexicalWords.save((err, result) => {
        if (err) errorLogger('Error saving data', err)
        lexicalWordsMock.verify()
        lexicalWordsMock.restore()
        expect(result).to.an('object')
        expect(result.status).to.equal(true)
        done()
      })
    })

    it('Should get created non lexical words', (done) => {
      chai.request(server)
        .get('/non-lexical-words')
        .end((err, res) => {
          if (err) {
            errorLogger('Error creating non-lexical words', err)
          }
          expect(STATUS_CODES.OK)
          const response = res.body
          expect(response).to.be.an('object')
          expect(response.nonLexicalWords[0].words).to.be.an('array')
          done()
        })
    })

    it('Should update the array of lexical words in the database', (done) => {
      chai.request(server)
        .put('/non-lexical-words')
        .send({ words: 'amaka' })
        .end((err, res) => {
          if (err) {
            errorLogger('Error updating lexical words', err)
          }
          expect(STATUS_CODES.OK)
          const response = res.body.response
          expect(response.nModified).to.equal(1)
          done()
        })
    })
  })
})
