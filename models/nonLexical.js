const mongoose = require('mongoose')

/**
 * NonLexicalWords: NonLexicalWords words for MongoDB.
 * Fields: title, words
 */
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
