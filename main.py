from flask import Flask, redirect, request
from dotenv import load_dotenv
from utils import gen_random_string
import os

app = Flask(__name__)
load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login", methods=["GET"])
def authorize_spotify():
    response_type = "code"
    scope = "user-top-read"
    redirect_uri = "http%3A%2F%2Flocalhost%3A8080%2Faccount"
    state = gen_random_string(16)
    
    # parentheses allow multiple string concatenation
    spotify_authorize_url = (
        f"https://accounts.spotify.com/authorize?"
        f"response_type={response_type}&"
        f"client_id={client_id}&"
        f"scope={scope}&"
        f"redirect_uri={redirect_uri}&"
        f"state={state}"
    )
    
    return redirect(spotify_authorize_url, code=302)

@app.route("/account", methods=["GET"])
def account_page():
    # TODO: compare the state parameter in the redirection uri
    # with the state parameter originally provided in the auth uri
    
    code = request.args.get("code")
    state = request.args.get("state")
    
    print(f"spotify response code is {code}")
    print(f"spotify state is {state}")
    return "<p>Account Page</p>"
    
    

if __name__ == '__main__':
    app.run(host='localhost', port=8080)