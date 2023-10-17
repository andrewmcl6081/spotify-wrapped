import { Link, Outlet, useOutlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import trackService from '../../services/tracks'
import artistService from '../../services/artists'

const Analytics2 = () => {
    const outlet = useOutlet()

    const [tracks, setTracks] = useState(null)
    const [artists, setArtists] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const [trackData, artistData] = await Promise.all([
                    trackService.getTopTracks(),
                    artistService.getTopArtists()
                ])

                console.log(trackData.data)

            } catch (error) {
                console.error('Error fetching data', error)
            }
        }

        fetchData()
    }, [])

    return(
        <>
            <h1>Analytics2</h1>
        </>
    )
}