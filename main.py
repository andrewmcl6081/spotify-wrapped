from flask import Flask, redirect, request
from dotenv import load_dotenv
from utils import gen_random_string, get_token, get_auth_header
import os
from requests import get

load_dotenv()

app = Flask(__name__)

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
    # state = request.args.get("state")
    
    token = get_token(CLIENT_ID, CLIENT_SECRET, code, REDIRECT_URI)
    
    test_url = "https://api.spotify.com/v1/me/top/artists"
    header = get_auth_header(token)
    
    response = get(test_url, headers=header)
    body = response.json()
    print(body)
    
    return "<p>Account Page</p>"
    
    

if __name__ == '__main__':
    app.run(host='localhost', port=8080)