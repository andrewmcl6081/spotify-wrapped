const authRouter = require('express').Router()
const e = require('express')
const utils = require('../utils/utils')

const REDIRECT_URI = process.env.REDIRECT_URI
const SCOPE = 'user-library-read user-read-recently-played user-top-read user-follow-read user-read-email user-read-private'

authRouter.get('/authorized', (req, res) => {
  if (req.session && req.session.accessToken) {
    res.json({ isAuthorized: true })
  }
  else {
    res.json({ isAuthorized: false })
  }
})

authRouter.get('/login', (req, res) => {
  const responseType = 'code'
  const state = utils.genRandomString(16)
  req.session.authState = state

  const spotifyAuthUrl = 'https://accounts.spotify.com/authorize?'
    + `response_type=${responseType}&`
    + `client_id=${process.env.CLIENT_ID}&`
    + `scope=${SCOPE}&`
    + `redirect_uri=${REDIRECT_URI}&`
    + `state=${state}`

  console.log("Redirecting to spotify for authentication")
  res.redirect(spotifyAuthUrl)
})

authRouter.get('/callback', async (req, res) => {
  const code = req.query.code
  const state = req.query.state

  if(state === req.session.authState) {
    delete req.session.authState
  }
  else {
    return res.status(500).json({"error": "Server Error", "message": "State mismatch or missing state"})
  }


  try {
    console.log("Getting tokens")
    const { accessToken, refreshToken} = await utils.getTokens(code)

    if(!accessToken || !refreshToken) {
      throw new Error('Invalid token')
    }

    console.log("Access Token: ", accessToken)

    req.session.accessToken = accessToken
    req.session.refreshToken = refreshToken

    res.redirect("http://localhost:5173/analytics/top-tracks")
  }
  catch (error) {
    res.status(500).json({ error: 'Unauthorized', message: 'An error occurred during token retrieval' })
  }
})

module.exports = authRouter