require('dotenv').config()

module.exports = {
  dbUri: process.env.DB_URI,
  port: process.env.PORT,
  sessionKey: process.env.SESSION_KEY,
  sessionDb: process.env.SESSION_DB,
}
