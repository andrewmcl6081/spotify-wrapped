import axios from 'axios'

const url = 'http://localhost:8080/api/top-tracks'

const getTopTracks = async () => {

    const response = await axios.get(url)
    return response.data
}

export default { getTopTracks }