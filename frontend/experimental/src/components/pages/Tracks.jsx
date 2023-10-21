import { useState, useEffect } from 'react'
import trackService from '../../services/tracks'
import TrackList from '../TrackList'

const Tracks = ({ isAuthorized }) => {
    console.log("Top of tracks authorized is ", isAuthorized)
    const [tracks, setTracks] = useState({})
    const [selectedTab, setSelectedTab] = useState('short_term')
    
    useEffect(() => {
        if(isAuthorized) {
            fetchData()
        }
    }, [isAuthorized])

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
                {selectedTab === 'short_term' && <TrackList tracks={tracks['short_term'] || []} />}
                {selectedTab === 'medium_term' && <TrackList tracks={tracks['medium_term'] || []} />}
                {selectedTab === 'long_term' && <TrackList tracks={tracks['long_term'] || []} />}
            </div>
        </>
    )
}

export default Tracks