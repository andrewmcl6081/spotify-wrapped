import TypeIt from "typeit-react";

function Card() {
    const handleLoginClick = () => {
        window.location.href = "http://localhost:8080/login"; // Redirect to Flask login route
    };

    const SuperStrong = ({ children }) => {
        return <strong style={{ fontSize: "20px" }}>{children}</strong>;
      };

    return <div class="card text-white text-center bg-dark center rounded-corners" style={{maxWidth: "18rem"}}>
        <div class="card-body">
            {/* <h5 class="card-title">Wrapify</h5> */}
            <TypeIt class="card-title"
                options={{
                    strings: ["<em><strong class='font-semibold'>Welcome to Wrapify</strong></em>"],
                    waitUntilVisible: true,
                    afterComplete: function (instance) {
                         instance.destroy();
                       }
                }}
            />
            <p class="card-text pt-2">Get your Spotify Wrapped year round.</p>
            <a href="#" class="btn btn-primary px-5 rounded-corners" style={{backgroundColor: "green"}} onClick={handleLoginClick}>Login</a>
        </div>
    </div>
}

export default Card;