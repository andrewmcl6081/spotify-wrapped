import axios from 'axios'
const base_url = 'http://localhost:8080/api/top-artists'

const getTopArtists = async () => {

    const response = await axios.get(base_url, { withCredentials: true})
    return response.data
}

export default { getTopArtists }