const { STATUS_CODES } = require('../utils')
/**
 * Used to run a health check on the API to ensure it is up and running
 * @param { Object } req Request object
 * @param { Object} res Express response object
 */
const healthCheck = async (req, res) => {
  res.status(STATUS_CODES.OK).send({ message: 'OK' })
}

module.exports = {
  healthCheck
}
