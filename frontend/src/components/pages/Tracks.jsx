import { useState, useEffect } from 'react'
import { Backdrop, CircularProgress, Typography, ToggleButton, ToggleButtonGroup, Box } from '@mui/material'
import trackService from '../../services/tracks'
import TrackList from '../TrackList'

const styles = {
  btnGroup: {
    '.MuiToggleButton-root': {
      color: '#B0E0E6',
      borderColor: '#B0E0E6',
      '&.Mui-selected': {
        color: '#fff',
        backgroundColor: '#B0E0E6',
        '&:hover': {
          backgroundColor: '#89C2D9',
        },
      },
      '&:hover': {
        backgroundColor: '#DAF4F0'
      }
    }
  },

  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 20px 20px 20px'
  }
}

const Tracks = ({ isAuthorized }) => {
  const [tracks, setTracks] = useState({})
  const [selectedTab, setSelectedTab] = useState('short_term')
  const [dataLoading, setDataLoading] = useState(true)
    
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
            trackService.getTopTracks('long_term')])

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

    setDataLoading(false)
  }

  const handleTabSwitch = (event, newTimeRange) => {
    if(newTimeRange !== null) {
      setSelectedTab(newTimeRange)
    }
  }

  return (
    <>
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
          open={dataLoading}
        >
          <CircularProgress sx={{ color: '#B0E0E6'}} />
        </Backdrop>
      </div>

      <Box sx={styles.toggleContainer}>
        <ToggleButtonGroup
          value={selectedTab}
          exclusive
          onChange={handleTabSwitch}
          aria-label='Time range'
          sx={styles.btnGroup}
        >
          <ToggleButton value='short_term' aria-label='Short Term'>
            Weekly
          </ToggleButton>
          <ToggleButton value='medium_term' aria-label='Medium Term'>
            6 Months
          </ToggleButton>
          <ToggleButton value='long_term' aria-label='Long Term'>
            Yearly
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <div>
        {selectedTab === 'short_term' && <TrackList tracks={tracks['short_term'] || []} />}
        {selectedTab === 'medium_term' && <TrackList tracks={tracks['medium_term'] || []} />}
        {selectedTab === 'long_term' && <TrackList tracks={tracks['long_term'] || []} />}
      </div>
    </>
  )
}

export default Tracks