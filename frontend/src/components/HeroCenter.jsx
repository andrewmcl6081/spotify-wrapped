import { Box, Typography} from '@mui/material'

const HeroCenter = () => {
  return (
    <Box
      sx={{
        flex: 1,
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
        my: 6,
        textAlign: 'center'
      }}
    >
      <Typography
        variant='h1'
        sx={{
          fontSize: { xs: 'xl', sm: 'xl', md: 'xl'},
          fontWeight: 600,
          color: '#B0E0E6'
        }}
      >
        {'What is Wrapify?'}
      </Typography>
      <Box
        sx={{
          color: 'antiqueWhite',
          fontWeight: 600,
          fontSize: 'sm',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {'About'}
      </Box>
    </Box>
  )
}

export default HeroCenter