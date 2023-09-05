
const ArtistCard = ({ artistImages, artistName}) => {

    const artistImage = artistImages[1]["url"]

    return (
        <div>
            <img src={artistImage} alt={`image of ${artistName}`}/>
            <h2>{artistName}</h2>
        </div>
    )
}

export default ArtistCard