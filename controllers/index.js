const healthCheckController = require('./health')
const lexicalWordsController = require('./lexical-controller')
const nonLexicalWordsController = require('./non-lexical-controller')

module.exports = {
  healthCheckController,
  lexicalWordsController,
  nonLexicalWordsController
}
