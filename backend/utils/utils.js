const axios = require('axios')
const crypto = require('crypto')
const dotenv = require('dotenv')
dotenv.config()

const REDIRECT_URI = process.env.REDIRECT_URI
const USER_INFO_URL = 'https://api.spotify.com/v1/me'

const getAuthHeader = (token) => {
  return { Authorization: 'Bearer ' + token }
}

const getUserId = async (accessToken) => {
  const headers = getAuthHeader(accessToken)

  try {
    const response = await axios.get(USER_INFO_URL, { headers })

    if(response.status === 200) {
      return response.data.id
    }
    else {
      return null
    }
  }
  catch (error) {
    console.error(error)
    return null
  }
}

// const getJwt = (userId, accessToken, refreshToken) => {
//   const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60) // 60 minutes from now

//   const jwtPayload = {
//     userId: userId,
//     authorized: true,
//     exp: expirationTime,
//     accessToken: accessToken,
//     refreshToken: refreshToken
//   }

//   return jwt.sign(jwtPayload, process.env.SECRET_KEY, { algorithm: 'HS256' })
// }

const genRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length)
}

const getTokens = async (code) => {
  const authString = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
  const base64Auth = Buffer.from(authString).toString('base64')

  const url = 'https://accounts.spotify.com/api/token'

  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI
  })

  const headers = {
    Authorization: 'Basic ' + base64Auth,
    'Content-Type': 'application/x-www-form-urlencoded'
  }


  try {
    const response = await axios.post(url, data, { headers })

    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token
    }
  }
  catch (error) {
    console.error(error.response ? error.response.data : error.message)
    return null
  }
}

const filterTracks = (tracks) => {
  return tracks.map(track => ({
    album_name: track.album.name,
    album_images: track.album.images,
    track_name: track.name,
    track_id: track.id,
    track_artists: track.artists.map(artist => artist.name)
  }));
}

const filterArtists = (artists) => {
  return artists.map(artist => ({
    artist_name: artist.name,
    artist_images: artist.images,
    artist_id: artist.id
  }));
}

module.exports = {
    getAuthHeader,
    getUserId,
    genRandomString,
    getTokens,
    filterTracks,
    filterArtists
}