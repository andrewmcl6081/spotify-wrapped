import axios from 'axios'

const getTopArtists = async (time_range) => {
    const url = `http://localhost:8080/api/top-artists/${time_range}`

    const response = await axios.get(url, { withCredentials: true})
    return response.data
}

export default { getTopArtists }