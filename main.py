from flask import Flask, redirect, request, session, url_for
from utils import gen_random_string, get_tokens
from dotenv import load_dotenv
from requests import get
import queries
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
    print("token from /analytics:", session["token_info"][0])
    
    return "<p>Analytics route done</p>"


@app.route("/top-tracks", methods=["GET"])
def get_top_tracks():
    token_info = session["token_info"]
    
    if not token_info:
        return "<p>Not Authorized</p>"
    
    token = token_info[0]
    top_tracks = queries.get_user_top_tracks(token, "short_term")
    
    return top_tracks


@app.route("/top-artists", methods=["GET"])
def get_top_artists():
    token_info = session["token_info"]
    
    if not token_info:
        return "<p>Not Authorized</p>"
    
    token = token_info[0]
    top_artists = queries.get_user_top_artists(token, "short_term")
    
    return top_artists
    
    
if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=8080)