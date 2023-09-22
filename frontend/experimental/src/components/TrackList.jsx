import { useEffect, useState } from 'react'
import trackService from '../services/tracks'
import TrackCard from './TrackCard'


const TrackList = () => {
    const [tracks, setTracks] = useState([])
    console.log("below state")

    useEffect(() => {
        console.log("setting tracks")
        trackService.getTopTracks().then(tracks => console.log(tracks))
    }, [])

    console.log("rendering")
    return (
        <div>
            <h1>My Top Tracks</h1>
            <div>
                {tracks.map(track => (
                    <TrackCard key={track["track_id"]}
                        albumImages={track["album_images"]}
                        trackName={track["track_name"]}
                        trackArtists={track["track_artists"]}
                    />
                ))}
            </div>
        </div>
    )
}

export default TrackList