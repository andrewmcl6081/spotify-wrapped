import { useState, useEffect } from 'react'
import ArtistCard from './ArtistCard'
import { testArtistData } from '../utilities/data'

const ArtistList = () => {
    const [artists, setArtists] = useState([])

    useEffect(() => {
        setArtists(testArtistData)
    }, [])

    return (
        <div>
            <h1>Your Top Artists</h1>
            <div>
                {artists.map(artist => (
                    <ArtistCard key={artist["artist_id"]}
                        artistImages={artist["artist_images"]}
                        artistName={artist["artist_name"]}
                    />
                ))}
            </div>
        </div>
    )
}

export default ArtistList