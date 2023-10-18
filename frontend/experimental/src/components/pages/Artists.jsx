import { useState, useEffect } from 'react'
import artistService from '../../services/artists'
import ArtistList from '../ArtistList'

const Artists = () => {

    const [artists, setArtists] = useState({})
    const [selectedTab, setSelectedTab] = useState('short_term')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [artistDataShort, artistDataMedium, artistDataLong] = await Promise.all([
                artistService.getTopArtists('short_term'),
                artistService.getTopArtists('medium_term'),
                artistService.getTopArtists('long_term')
            ])

            const artistData = {
                'short_term': [...artistDataShort],
                'medium_term': [...artistDataMedium],
                'long_term': [...artistDataLong]
            }

            setArtists(artistData)
        }
        catch (error) {
            console.error('Error fetching data', error)
        }
    }

    const handleTabSwitch = (time_range) => {
        setSelectedTab(time_range)
    }

    return (
        <>
            <div>
                <button onClick={() => handleTabSwitch('short_term')}>Short</button>
                <button onClick={() => handleTabSwitch('medium_term')}>Medium</button>
                <button onClick={() => handleTabSwitch('long_term')}>Long</button>
            </div>
            <div>
                {selectedTab === 'short_term' && <ArtistList artists={artists['short_term'] || []} />}
                {selectedTab === 'medium_term' && <ArtistList artists={artists['medium_term'] || []} />}
                {selectedTab === 'long_term' && <ArtistList artists={artists['long_term'] || []} />}
            </div>
        </>
    )
}

export default Artists