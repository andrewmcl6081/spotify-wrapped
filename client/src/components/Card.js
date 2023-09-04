function Card() {
    const handleLoginClick = () => {
        window.location.href = "http://localhost:8080/login"; // Redirect to Flask login route
    };

    return <div class="card text-white bg-dark mx-auto mb-3" style={{maxWidth: "18rem"}}>
        <div class="card-body">
            <h5 class="card-title">Wrapify</h5>
            <p class="card-text">Get your Spotify Wrapped year round.</p>
            <a href="#" class="btn btn-primary" style={{backgroundColor: "green"}} onClick={handleLoginClick}>Login</a>
        </div>
    </div>
}

export default Card;