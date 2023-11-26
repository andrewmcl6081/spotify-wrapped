const queryRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const utils = require('../utils/utils')

const TIME_RANGES = ["short_term", "medium_term", "long_term"]

queryRouter.get('/top-tracks/:timeRange', async (req, res) => {
  const timeRange = req.params.timeRange

  if(!TIME_RANGES.includes(timeRange)) {
    return res.status(400).json({ error: 'Bad Request', message: 'Invalid time range.'})
  }

  const authorizationHeader = req.headers.authorization

  if(!authorizationHeader) {
    return res.status(401).json({ error: 'Unauthorized', message: 'JWT invalid or missing from the header' })
  }

  try {
    const jwtToken = authorizationHeader.split("Bearer ")[1]
    const payload = jwt.verify(jwtToken, process.env.SECRET_KEY, { algorithm: 'HS256' })
    const { accessToken } = payload


    const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=12`
    const headers = utils.getAuthHeader(accessToken)

    const response = await axios.get(url, { headers })

    if(response.status === 200) {
      const data = response.data
      return res.json(utils.filterTracks(data.items))
    }
    else {
      return res.status(400).json({ error: 'Bad Request', message: 'Failed to fetch top aretists from Spotify.' })
    }
  }
  catch (e) {
    if(e.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized', message: 'JWT has expired' })
    }
    else if(e.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Unauthorized', message: 'Failed to decode JWT.' })
    }

    return res.status(500).json({ error: "Internal Server Error", message: e.message})
  }
})

queryRouter.get('/top-artists/:timeRange', async (req, res) => {
  const timeRange = req.params.timeRange

  if(!TIME_RANGES.includes(timeRange)) {
    return res.status(400).json({ error: 'Bad Request', message: 'Invalid time range.'})
  }

  const authorizationHeader = req.headers.authorization

  if(!authorizationHeader) {
    return res.status(401).json({ error: 'Unauthorized', message: 'JWT invalid or missing from the header' })
  }

  try {
    const jwtToken = authorizationHeader.split("Bearer ")[1]
    const payload = jwt.verify(jwtToken, process.env.SECRET_KEY, { algorithm: 'HS256' })
    const { accessToken } = payload


    const url = `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=12`
    const headers = utils.getAuthHeader(accessToken)

    const response = await axios.get(url, { headers })

    if(response.status === 200) {
      const data = response.data
      return res.json(utils.filterArtists(data.items))
    }
    else {
      return res.status(400).json({ error: 'Bad Request', message: 'Failed to fetch top aretists from Spotify.' })
    }
  }
  catch (e) {
    if(e.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized', message: 'JWT has expired' })
    }
    else if(e.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Unauthorized', message: 'Failed to decode JWT.' })
    }

    return res.status(500).json({ error: "Internal Server Error", message: e.message})
  }
})

module.exports = queryRouter