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

  NonLexicalWordsModel.update({ title: 'nonLexicalWords' }, { $push: {words : words} }, (err, data) => {
    if (!err) {
      if (data === null) {
        res.status(STATUS_CODES.NOT_FOUND).json(
          { message: `Non lexical words do not exist. Please create using POST endpoint` }
        )
        return
      }
      res.status(STATUS_CODES.OK).json({ response: data })
    } else res.status(STATUS_CODES.ERROR).json({ message: `Error: ${err}` })
  })
}

module.exports = {
  getAllNonLexicalWords,
  UpdateNonLexicalWords
}
