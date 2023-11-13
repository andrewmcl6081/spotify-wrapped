import { Card, CardMedia, CardContent, Typography } from '@mui/material'

const styles = {
  card: {
    display: 'inline-block',
    maxWidth: 345,
    margin: '0.5rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderWidth: '0.25rem',
    borderRadius: '0.5rem',
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
const ArtistCard = ({ artistImages, artistName}) => {
  const artistImage = artistImages[1]["url"]

  return (
    <>
      <Card sx={{...styles.card, ...styles.grow}}>
        <CardMedia
          component='img'
          alt={`${artistName} Artist Image`}
          height='300'
          image={artistImage}
          title={`${artistName} Artist Image`}
          sx={styles.cardMedia}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {artistName}
          </Typography>
        </CardContent>
      </Card>
    </>
    )
}

export default ArtistCard