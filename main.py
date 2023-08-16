from flask import Flask, redirect, request
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login")
def authorize_spotify():
    response_type = "code"
    scope = "user-top-read"
    redirect_uri = "http%3A%2F%2Flocalhost%3A8080%2Faccount"
    
    # parentheses allow multiple string concatenation
    spotify_authorize_url = (
        f"https://accounts.spotify.com/authorize?"
        f"client_id={client_id}&"
        f"response_type={response_type}&"
        f"redirect_uri={redirect_uri}&"
        f"scope={scope}"
    )
    
    return redirect(spotify_authorize_url, code=302)

@app.route("/account")
def account_page():
    code = request.args.get('code')
    print(f"spotify response code is {code}")
    return "<p>Account Page</p>"
    
    

if __name__ == '__main__':
    app.run(host='localhost', port=8080)