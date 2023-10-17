<<<<<<< HEAD
import { Link, Outlet, useOutlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import trackService from '../../services/tracks'
import artistService from '../../services/artists'

const Analytics2 = () => {
    const outlet = useOutlet()
=======
import { Link, Outlet, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import trackService from '../../services/tracks'
import artistService from '../../services/artists'
import Tracks from './Tracks'
import Artists from './Artists'

const Analytics2 = () => {
>>>>>>> 68773e82a317538e7a1df198f8384473b730175d

    const [tracks, setTracks] = useState(null)
    const [artists, setArtists] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const [trackData, artistData] = await Promise.all([
                    trackService.getTopTracks(),
                    artistService.getTopArtists()
                ])

<<<<<<< HEAD
                console.log(trackData.data)

            } catch (error) {
=======
                setTracks(trackData)
                setArtists(artistData)
            }
            catch (error) {
>>>>>>> 68773e82a317538e7a1df198f8384473b730175d
                console.error('Error fetching data', error)
            }
        }

        fetchData()
    }, [])

    return(
        <>
            <h1>Analytics2</h1>
<<<<<<< HEAD
        </>
    )
}
=======

            <Routes>
                <Route index element={ <Tracks tracks={tracks}/> }/>
                <Route path='top-tracks' element={ <Tracks tracks={tracks}/> }/>
                <Route path='top-artists' element={ <Artists artists={artists}/> }/>
            </Routes>
        </>
    )
}

export default Analytics2
>>>>>>> 68773e82a317538e7a1df198f8384473b730175d
