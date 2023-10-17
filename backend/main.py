from flask import Flask, redirect, request, session, make_response
from flask_session import Session
from flask_cors import CORS
from utils import gen_random_string, get_tokens
from dotenv import load_dotenv
import queries
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", supports_credentials=True)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["CORS_ALLOW_CREDENTIALS"] = True
Session(app)

#Globals
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8080/api/callback"
SCOPE = "user-library-read user-read-recently-played user-top-read user-follow-read user-read-email"


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
    
    access_token, refresh_token = get_tokens(code)
    
    response = make_response(redirect("http://localhost:5173/analytics/top-tracks"))
    response.set_cookie("access_token", access_token, httponly=True)
    response.set_cookie("refresh_token", refresh_token, httponly=True)
    
    return response

@app.route("/api/top-tracks", methods=["GET"])
def get_top_tracks():
    
    access_token = request.cookies.get("access_token")
    print("token from /top-tracks", access_token)
    
    if not access_token:
        return "<p>Not Authorized</p>"
    
    
    top_tracks = queries.get_user_top_tracks(access_token, "short_term")
    
    return top_tracks


@app.route("/api/top-artists", methods=["GET"])
def get_top_artists():
    access_token = request.cookies.get("access_token")
    
    if not access_token:
        return "<p>Not Authorized</p>"
    
    
    top_artists = queries.get_user_top_artists(access_token, "short_term")
    
    return top_artists
    
    
if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=8080)