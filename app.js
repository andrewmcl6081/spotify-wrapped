const express = require('express')
const session = require('express-session')
const cors = require('cors')
const authRouter = require('./controllers/controller.auth')
const queryRouter = require('./controllers/controller.queries')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'frontend/dist')))

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))

app.use('/api/auth', authRouter)
app.use('/api/query', queryRouter)

app.get('/api', (req, res) => {
  console.log('requested')
  res.json({ message: "Hello from Express!!!" });
});

module.exports = app