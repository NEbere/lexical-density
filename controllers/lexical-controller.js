// Local imports
const { calculateSum, calculateComplexity, STATUS_CODES } = require('../utils')

const computeLexicalDensity = async (req, res) => {
  let status
  let response

  const { words } = req.body
  if (words.length < 100) {
    status = STATUS_CODES.BAD_REQUEST
    response = { message: 'Input must be more than 1000 characters' }
  } else {
    if (req.query.mode) {
      const sentences = words.split(',')
      const sentencesArray = [].concat(await Promise.all(sentences.map(sentence => calculateComplexity(sentence))))
      const total = sentencesArray.reduce(calculateSum)
      status = STATUS_CODES.OK
      response = { overall_ld: total, sentence_ld: sentencesArray }
    } else {
      const complexity = await calculateComplexity(words)
      status = STATUS_CODES.OK
      response = { data: { overall_ld: complexity } }
    }
  }

  res.status(status).json(response)
}

module.exports = {
  computeLexicalDensity
}
