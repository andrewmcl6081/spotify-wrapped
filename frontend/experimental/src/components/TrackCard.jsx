import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'

const styles = {
  card: {
    display: 'inline-block',
    maxWidth: 345,
    margin: '0.5rem',
    backgroundColor: '#f5f5f5',
    borderWidth: '0.25rem',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'
  },

  cardMedia: {
    width: '300px',
    height: '300px'
  },

  grow: {
    MozOsxFontSmoothing: 'grayscale',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
    transition: 'transform 0.25s ease-out',
    '&:hover, &:focus': {
      transform: 'scale(1.05)',
    },
    '&:active': {
      transform: 'scale(0.90)',
    },
  }
}

const TrackCard = ({ albumImages, trackName, trackArtists }) => {
  const albumImage_url = albumImages[1]["url"]
  
  return (
    <>
      <Card sx={{ ...styles.card, ...styles.grow }} >
        <CardMedia
          component='img'
          alt={`${trackName} Cover Image`}
          height='300'
          image={albumImage_url}
          title={`${trackName} Cover Image`}
          sx={styles.cardMedia}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {trackName.split('(')[0].trim()}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {trackArtists.join(', ')}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default TrackCard