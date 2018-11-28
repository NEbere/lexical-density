const { STATUS_CODES } = require('../utils')

const healthCheck = async (req, res) => {
  res.status(STATUS_CODES.OK).send({ message: 'OK' })
}

module.exports = {
  healthCheck
}
