const express = require('express')
const session = require('express-session')
const cors = require('cors')
const authRouter = require('./controllers/controller.auth')
const queryRouter = require('./controllers/controller.queries')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.static('dist'))

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))

app.use('/api/auth', authRouter)
app.use('/api/query', queryRouter)

module.exports = app