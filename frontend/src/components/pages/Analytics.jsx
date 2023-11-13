import { useState } from 'react'
import { Route, Routes, useNavigate} from 'react-router-dom'
import { Typography, ToggleButton, ToggleButtonGroup, Box } from '@mui/material'
import Tracks from './Tracks'
import Artists from './Artists'

const styles = {
  header: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#B0E0E6',
    margin: '0 auto',
    padding: '1rem'
  },

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
    margin: '20px 20px 10px 20px'
  }
}

const Analytics = ({ isAuthorized }) => {
  const [alignment, setAlignment] = useState('top-tracks')
  const navigate = useNavigate()

  const handleAlignment = (event, newAlignment) => {
    if(newAlignment !== null) {
      setAlignment(newAlignment)
      navigate(`/analytics/${newAlignment}`)
    }
  }

  return(
    <>
      <Typography
        variant='h2'
        align='center'
        sx={styles.header}
      >
        Analytics
      </Typography>

      <Box sx={styles.toggleContainer}>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label='text alignment'
          sx={styles.btnGroup}
        >
          <ToggleButton value='top-tracks' aria-label='top tracks'>
            Top Tracks
          </ToggleButton>
          <ToggleButton value='top-artists' aria-label='top artists'>
            Top Artists
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Routes>
        <Route index element={ <Tracks isAuthorized={isAuthorized} /> }/>
        <Route path='top-tracks' element={ <Tracks isAuthorized={isAuthorized} /> }/>
        <Route path='top-artists' element={ <Artists isAuthorized={isAuthorized} /> }/>
      </Routes>
    </>
  )
}

export default Analytics