import Button from '@mui/material/Button'

const Home = () => {

  return (
    <>
      <h1>Home Page</h1>
      <Button href='/api/auth/login' variant='contained'>Authorize Spotify</Button>
    </>
  )
}

export default Home