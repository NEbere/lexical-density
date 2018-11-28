// Third party imports
const router = require('express').Router()

// local imports
const { lexicalWordsController, healthCheckController, nonLexicalWordsController } = require('../controllers')

/**
 * Health check endpoint: Used to run a health check on ther server endpoints
 */
router.get('/_health', healthCheckController.healthCheck)

router.post('/complexity', lexicalWordsController.computeLexicalDensity)

router.get('/non-lexical-words', nonLexicalWordsController.getAllNonLexicalWords)

router.put('/non-lexical-words', nonLexicalWordsController.UpdateNonLexicalWords)


module.exports = router
