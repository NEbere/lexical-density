// Third party imports
const router = require('express').Router()

// local imports
const { lexicalWordsController, healthCheckController, nonLexicalWordsController } = require('../controllers')

/**
 * Health check endpoint: Used to run a health check on ther server endpoints
 */
router.get('/_health', healthCheckController.healthCheck)

/**
 * complexity route. Used to compute the lexical complexity for words passed
 * Has two variants: /complexity to compute the overall lexical complexity
 * * sample POST {"words": "Kim loves going To the cinema"}
 * /complexity?mode=verbose to compute the lexical density for each sentence
 * sample POST {"words": "Kim loves going To the cinema, I am a cat"}
 * I.E comma separated sentences
 */
router.post('/complexity', lexicalWordsController.computeLexicalDensity)

/**
 * API endpoint to GET all lexical words in the database
 * Sample response: 
 * {
  "nonLexicalWords": [
    {
      "words": [
        "to",
        "got",
        "is",
      ],
      "_id": "5bfe90c0a53d8f1a9dad5395",
      "title": "nonLexicalWords"
    },
 */
router.get('/non-lexical-words', nonLexicalWordsController.getAllNonLexicalWords)

/**
 * API endpoint to Update the array of non lexical words in the database
 * Sample POST data: 
 * {"words": "chaff"}
 */
router.put('/non-lexical-words', nonLexicalWordsController.UpdateNonLexicalWords)

module.exports = router
