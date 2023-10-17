import { useState, useEffect } from 'react'
import trackService from '../../services/tracks'
import TrackList from '../TrackList'

const Tracks = () => {

    const [tracks, setTracks] = useState({})
    const [selectedTab, setSelectedTab] = useState('short_term')
    
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const [trackDataShort, trackDataMedium, trackDataLong] = await Promise.all([
                    trackService.getTopTracks('short_term'),
                    trackService.getTopTracks('medium_term'),
                    trackService.getTopTracks('long_term')
                ])
                
                const trackData = {
                    'short_term': [...trackDataShort],
                    'medium_term': [...trackDataMedium],
                    'long_term': [...trackDataLong]
                }

                setTracks(trackData)
            }
            catch (error) {
                console.error('Error fetching data', error)
            }
        }

        fetchData()
    }, [])
    console.log(tracks)
    return (
        <>
            <div>
                <button onClick={() => setSelectedTab('short_term')}>Short</button>
                <button onClick={() => setSelectedTab('medium_term')}>Medium</button>
                <button onClick={() => setSelectedTab('long_term')}>Long</button>
            </div>
            <div>
                {selectedTab === 'short_term' && <TrackList tracks={tracks['short_term'] || []} />}
                {selectedTab === 'medium_term' && <TrackList tracks={tracks['medium_term'] || []} />}
                {selectedTab === 'long_term' && <TrackList tracks={tracks['long_term'] || []} />}
            </div>
        </>
    )
}

export default Tracks