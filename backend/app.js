const express = require('express')
const session = require('express-session')
const cors = require('cors')
const authRouter = require('./controllers/controller.auth')
const queryRouter = require('./controllers/controller.queries')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  }
}))

app.use('/api/auth', authRouter)
app.use('/api/query', queryRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app