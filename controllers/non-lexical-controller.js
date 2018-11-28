// Local imports
const NonLexicalWordsModel = require('../models').nonlexicalwordsModel
const { STATUS_CODES } = require('../utils')

/**
 * getAllNonLexicalWords: API endpoint to get all non-lexical words stored in the database(MongoDB)
 * @param { Object } req Request object
 * @param { Object } res Response Object
 */
const getAllNonLexicalWords = (req, res) => {
  const query = NonLexicalWordsModel.find({ title: 'nonLexicalWords' })
  query.exec((err, nonLexicalWords) => {
    if (err) {
      res.status(STATUS_CODES.ERROR).json({ message: `Error: ${err}` })
      return
    }
    const statusCode = STATUS_CODES.OK
    res.status(statusCode).json({ nonLexicalWords })
  })
}

/**
 * UpdateNonLexicalWords: API endpoint update non-lexical words in the database
 * Uses mongoDB Push function to add the content of request body to the array of non-lexical words in the database
 * @param { Object } req Request object
 * @param { Object } res Response Object
 */
const UpdateNonLexicalWords = (req, res) => {
  const { words } = req.body

  NonLexicalWordsModel.update({ title: 'nonLexicalWords' }, { $push: { words: words } }, (err, data) => {
    let status
    let response
    if (!err) {
      if (data === null) {
        status = STATUS_CODES.NOT_FOUND
        response = { message: 'Non lexical words do not exist. Please create using POST endpoint' }
      }
      status = STATUS_CODES.OK
      response = { response: data }
    } else {
      status = STATUS_CODES.ERROR
      response = { message: `Error: ${err}` }
    }
    res.status(status).json(response)
  })
}

module.exports = {
  getAllNonLexicalWords,
  UpdateNonLexicalWords
}
