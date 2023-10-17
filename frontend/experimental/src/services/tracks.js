import axios from 'axios'

const getTopTracks = async (time_range) => {
    const url = `http://localhost:8080/api/top-tracks/${time_range}`
    
    const response = await axios.get(url, { withCredentials: true})
    return response.data
}

export default { getTopTracks }