const NonLexicalWordsModel = require('../models').nonlexicalwordsModel
const { STATUS_CODES } = require('../utils')

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
