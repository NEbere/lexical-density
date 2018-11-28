const mongoose = require('mongoose')

const NonLexicalWords = mongoose.Schema({
  title: {
    type: String
  },
  words: {
    type: Array
  }
})

const nonlexicalwordsModel = mongoose.model('nonlexicalwords', NonLexicalWords)

module.exports = nonlexicalwordsModel
