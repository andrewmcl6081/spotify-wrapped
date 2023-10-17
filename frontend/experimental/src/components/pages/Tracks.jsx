import { useState, useEffect } from 'react'
import TrackList from '../TrackList'

const Tracks = () => {

    const [tracks, setTracks] = useState([])

    useEffect(() => {
        
    })
    return (
        <>
            <h1>Tracks Page</h1>
            <TrackList />
        </>
    )
}

export default Tracks