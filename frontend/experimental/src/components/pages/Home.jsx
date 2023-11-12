import { Typography, Button, Stack } from '@mui/material'
import RedirectButton from '../RedirectButton'

const styles = {
  header: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#B0E0E6',
    margin: '0 auto',
    padding: '1rem'
  }
}

const Home = () => {

  return (
    <>
      <Typography
        variant='h2'
        align='center'
        sx={styles.header}
      >
        Authorize Spotify
      </Typography>
      
      <RedirectButton to='http://localhost:8080/api/login'/>
      <Button
        variant='contained'
      >
        Click me
      </Button>
    </>
  )
}

export default Home