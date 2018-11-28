const NonLexicalWordsModel = require('../models').nonlexicalwordsModel

const calculateSum = (total, num) => {
  return total + num
}

const calculateComplexity = async sentence => {
  const query = await NonLexicalWordsModel.find({}).exec()
  const nonLexicalWords = query[0].words
  const sentenceArray = sentence.split(' ')
  const lexicalWordsFound = sentenceArray.filter(word => {
    return nonLexicalWords.indexOf(word.toLocaleLowerCase()) === -1
  })
  const complexity = Math.round(lexicalWordsFound.length / sentenceArray.length * 100)
  return complexity
}

module.exports = {
  calculateSum,
  calculateComplexity
}
