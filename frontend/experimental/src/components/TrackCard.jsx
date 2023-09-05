
const TrackCard = ({ albumImages, trackName, trackArtists }) => {
    console.log("in track card")
    const albumImage = albumImages[1]["url"]

    return (
        <div>
            <img src={albumImage}/>
            <h2>{trackName}</h2>
            <div>
                {trackArtists.map((artist, index) => (
                    <p key={index}>{artist}</p>
                ))}
            </div>
        </div>
    )
}

export default TrackCard