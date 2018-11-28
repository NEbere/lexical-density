// Third party imports
const express = require('express')
const bodyParser = require('body-parser')
const responseTime = require('response-time')
const cors = require('cors')
const mongoose = require('mongoose')

// Local imports
const routes = require('./routes')
const { infoLogger } = require('./utils')

const app = express()
app.use(cors())
app.options('*', cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(responseTime())

app.use('/', routes)
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// mongoDB URL.
// TODO: move to env config
const mongoDBURL = `mongodb://localhost:27017/vai`
mongoose.connect(process.env.DATABASE_URL || mongoDBURL)

mongoose.connection.on('connected', () => {
  infoLogger('Connection open to mongo db', null)
})

// Start the server...
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${server.address().port}`)
})

module.exports = server
