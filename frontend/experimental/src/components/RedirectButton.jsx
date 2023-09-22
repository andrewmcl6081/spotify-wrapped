
const RedirectButton = ({ to }) => {
    
    const handleAuthorizeSpotify = () => {
        window.location.href = to
    }

    return (
        <button onClick={handleAuthorizeSpotify}>
            Authorize Spotify
        </button>
    )
}

export default RedirectButton