import { Box } from '@mui/material'
import ArtistCard from './ArtistCard'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '0 auto',
    padding: '1rem'
  }
}

const ArtistList = ({ artists }) => {

  return (
    <>
      <Box sx={styles.container}>
        {artists.map(artist => (
          <ArtistCard key={artist["artist_id"]}
            artistImages={artist["artist_images"]}
            artistName={artist["artist_name"]}
          />
        ))}
      </Box>
    </>
  )
}

export default ArtistList