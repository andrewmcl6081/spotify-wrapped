import axios from 'axios'

const getTopTracks = async (time_range) => {
  const url = `/api/query/top-tracks/${time_range}`

  try {
    const response = await axios.get(url, { withCredentials: true })
    console.log(response)
    return response.data
  }
  catch (error) {
    console.log(error)
    throw error
  }
}

export default { getTopTracks }