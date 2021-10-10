const mongoose = require('mongoose')

const config = require('./config')

mongoose.connect(config.dbUri)
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error')
)
