from flask import Flask, redirect, request, session, url_for
from flask_session import Session
from flask_cors import CORS
from utils import gen_random_string, get_tokens
from dotenv import load_dotenv
from requests import get
import queries
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = "spotify_wrapped"


#Globals
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8080/api/callback"
SCOPE = "user-library-read user-read-recently-played user-top-read user-follow-read"


@app.route("/api/login", methods=["GET"])
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


@app.route("/api/callback", methods=["GET"])
def account_page():
        
    code = request.args.get("code")
    state = request.args.get("state")
    stored_state = session.get("state")  
    
    # Dont allow user access without authorization
    if state is None or state != stored_state:
        return "<p>Unauthorized</p>"
    
    print("State from /callback", state)
    
    session["access_tokens"] = get_tokens(code)
    print("token from /analytics:", session["access_tokens"][0])
    
    return redirect("http://localhost:5173/analytics")


# @app.route("/main")
# def main():
#     access_token = session.get("access_tokens")
#     print("access token from /main", access_token[0])
    
#     return "<p>Welcome</p>"


@app.route("/api/top-tracks", methods=["GET"])
def get_top_tracks():
    access_tokens = session.get("access_tokens")
    print("token from /top-tracks", access_tokens)
    
    if not access_tokens:
        return "<p>Not Authorized</p>"
    
    token = access_tokens[0]
    top_tracks = queries.get_user_top_tracks(token, "short_term")
    
    return top_tracks


@app.route("/api/top-artists", methods=["GET"])
def get_top_artists():
    access_tokens = session.get("access_tokens")
    
    if not access_tokens:
        return "<p>Not Authorized</p>"
    
    token = access_tokens[0]
    top_artists = queries.get_user_top_artists(token, "short_term")
    
    return top_artists
    
    
if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=8080)