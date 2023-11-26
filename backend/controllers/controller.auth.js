const authRouter = require('express').Router()
const utils = require('../utils/utils')

const REDIRECT_URI = process.env.REDIRECT_URI || 'https://young-meadow-2700.fly.dev/api/auth/callback'
const SCOPE = 'user-library-read user-read-recently-played user-top-read user-follow-read user-read-email user-read-private'

authRouter.get('/login', async (req, res) => {
  const responseType = 'code'
  const state = utils.genRandomString(16)
  req.session.state = state

  console.log('State from auth url ', state)

  const spotifyAuthUrl = 'https://accounts.spotify.com/authorize?'
    + `response_type=${responseType}&`
    + `client_id=${process.env.CLIENT_ID}&`
    + `scope=${SCOPE}&`
    + `redirect_uri=${REDIRECT_URI}&`
    + `state=${state}`

  console.log('redirecting to ', spotifyAuthUrl)

  res.redirect(spotifyAuthUrl)
})

authRouter.get('/callback', async (req, res) => {
  console.log('in call back')

  const code = req.query.code
  const state = req.query.state
  const storedState = req.session.state

  if(!state || state !== storedState) {
    return res.status(401).json({ error: 'Unauthorized', message: 'State mismatch or missing state'})
  }
  else {
    delete req.session.state
  }


  try {
    const { accessToken, refreshToken} = await utils.getTokens(code)
    console.log('Access Token from /callback ', accessToken)

    if(!accessToken || !refreshToken) {
      throw new Error('Invalid token')
    }

    const userId = await utils.getUserId(accessToken)
    console.log('User ID from /callback ', userId)

    if(userId !== null) {
      const jwtToken = utils.getJwt(userId, accessToken, refreshToken)
      console.log(jwtToken)
      
      const redirectUrl = process.env.REDIRECT_URL || `https://young-meadow-2700.fly.dev/analytics/top-tracks`
      const jwtRedirectUrl = redirectUrl + `?jwt=${jwtToken}`
      
      res.redirect(jwtRedirectUrl)
    }
    else {
      res.status(401).json({ error: 'Unauthorized', message: 'Failed to generate JWT'})
    }
  }
  catch (error) {
    res.status(500).json({ error: 'Unauthorized', message: 'An error occurred during token retrieval' })
  }
})

module.exports = authRouter