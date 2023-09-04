import React from 'react';

function Navbar() {
    const handleLoginClick = () => {
        window.location.href = "http://localhost:8080/login"; // Redirect to Flask login route
    };

    return <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/Home">Spotify Wrapped</a>

        <div class="navbar-nav">
            <a class="nav-item nav-link" href="#" onClick={handleLoginClick}>Login</a>
            <a class="nav-item nav-link" href="/TopTracks">Top Tracks</a>
            <a class="nav-item nav-link" href="/TopArtists">Top Artists</a>
            <a class="nav-item nav-link" href="/About">About</a>
        </div>
    </nav>
}

export default Navbar;