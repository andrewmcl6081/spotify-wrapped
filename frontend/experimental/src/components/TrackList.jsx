import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

import TrackCard from './TrackCard'

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

const TrackList = ({ tracks }) => {
  console.log('tracks is ', tracks)
  return (
    <>
      <Box sx={styles.container}>
        {tracks.map(track => (
          <TrackCard key={track["track_id"]}
            albumImages={track["album_images"]}
            trackName={track["track_name"]}
            trackArtists={track["track_artists"]}
          />
        ))}
      </Box>
    </>
  )
}

export default TrackList