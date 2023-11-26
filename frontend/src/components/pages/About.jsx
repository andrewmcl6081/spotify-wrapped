import { Container, Typography, Box } from '@mui/material'

const styles = {
  header: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#B0E0E6',
    margin: '0 auto',
    padding: '1rem'
  }
}

const About = () => {

  return (
    <>
      <Typography
        variant='h2'
        align='center'
        sx={styles.header}
      >
        What is Wrapify?
      </Typography>          
    </>
  )
}

export default About