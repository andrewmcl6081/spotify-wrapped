from flask import Flask, redirect, request, session, url_for
from utils import gen_random_string, get_tokens
from queries import get_user_top_tracks
from dotenv import load_dotenv
from requests import get
import os

load_dotenv()

app = Flask(__name__)
app.secret_key = "spotify_wrapped"

#Globals
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8080/analytics"
SCOPE = "user-library-read user-read-recently-played user-top-read user-follow-read"


@app.route("/")
def home():
    return "<p>Home Page</p>"


@app.route("/login", methods=["GET"])
def authorize_spotify():
    response_type = "code"
    state = gen_random_string(16)
    session["state"] = state
    
    print("State from auth url", state)
    
    # parentheses allow multiple string concatenation
    spotify_authorize_url = (
        f"https://accounts.spotify.com/authorize?"
        f"response_type={response_type}&"
        f"client_id={CLIENT_ID}&"
        f"scope={SCOPE}&"
        f"redirect_uri={REDIRECT_URI}&"
        f"state={state}"
    )
    
    return redirect(spotify_authorize_url, code=302)


@app.route("/analytics", methods=["GET"])
def account_page():
        
    code = request.args.get("code")
    state = request.args.get("state")
    stored_state = session["state"]
    
    # Dont allow user access without authorization
    if state is None or state != stored_state:
        return redirect(url_for("home"))
    
    
    session["token_info"] = get_tokens(code)
    print(get_user_top_tracks(session["token_info"][0], "short_term"))
    
    return "<p>You are now authorized to make API calls</p>"
    
    
if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=8080)