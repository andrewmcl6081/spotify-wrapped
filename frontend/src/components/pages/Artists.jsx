import { useState, useEffect } from 'react'
import { Backdrop, CircularProgress, Typography, ToggleButton, ToggleButtonGroup, Box} from '@mui/material'
import artistService from '../../services/artists'
import ArtistList from '../ArtistList'

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

const Artists = ({ isAuthorized }) => {
  const [artists, setArtists] = useState({})
  const [selectedTab, setSelectedTab] = useState('short_term')
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if(isAuthorized) {
      fetchData()
    }
  }, [isAuthorized])

  const fetchData = async () => {
    try {
      const [artistDataShort, artistDataMedium, artistDataLong] = await Promise.all([
            artistService.getTopArtists('short_term'),
            artistService.getTopArtists('medium_term'),
            artistService.getTopArtists('long_term')])

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
        {selectedTab === 'short_term' && <ArtistList artists={artists['short_term'] || []} />}
        {selectedTab === 'medium_term' && <ArtistList artists={artists['medium_term'] || []} />}
        {selectedTab === 'long_term' && <ArtistList artists={artists['long_term'] || []} />}
      </div>
    </>
  )
}

export default Artists