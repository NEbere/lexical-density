/**
 * errorLogger: Log the provided error to console
 * @param {String} errorMessage The message to log alongside the error to console
 * @param {error} error the error to log to console
 */
const errorLogger = (errorMessage, error) => {
  console.error(`${errorMessage}: ${error}`)
}

/**
   * infoLogger: Log the provided info to console
   * @param {String} infoMessage The message to log alongside the info to console
   * @param {error} info the info to log to console
   */
const infoLogger = (infoMessage, info) => {
  console.info(`${infoMessage}: ${info}`)
}

module.exports = {
  errorLogger,
  infoLogger
}
