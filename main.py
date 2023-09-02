from utils import gen_random_string, get_tokens
from flask import Flask, redirect, request
from queries import get_user_top_tracks
from dotenv import load_dotenv
from requests import get
import os

load_dotenv()
app = Flask(__name__)


#Globals
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8080/analytics"
SCOPE = "user-library-read user-read-recently-played user-top-read user-follow-read"


@app.route("/")
def hello_world():
    return "<p>Home Page</p>"


@app.route("/login", methods=["GET"])
def authorize_spotify():
    response_type = "code"
    state = gen_random_string(16)
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
    # TODO: compare the state parameter in the redirection uri
    # with the state parameter originally provided in the auth uri
    
    code = request.args.get("code")
    state = request.args.get("state")
    print("State from callback uri", state)
    
    access_token, refresh_token = get_tokens(code)
    response = get_user_top_tracks(access_token, "short_term")
    
    return response
    
    
if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=8080)