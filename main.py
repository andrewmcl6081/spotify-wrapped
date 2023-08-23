from flask import Flask, redirect, request
from dotenv import load_dotenv
from utils import gen_random_string, get_auth_header
import os
import requests

load_dotenv()

app = Flask(__name__)

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
redirect_uri = "http://localhost:8080/account"

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login", methods=["GET"])
def authorize_spotify():
    response_type = "code"
    scope = "user-top-read"
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
    
    url = "https://accounts.spotify.com/api/token"
    
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri
    }
    
    base64_auth = get_auth_header(client_id, client_secret)
    
    headers = {
        "Authorization": "Basic " + base64_auth,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    response = requests.post(url=url, data=data, headers=headers)
    
    if response.status_code != 200:
        print(response.json())
        return
    

    json_result = response.json()
    print(json_result)
    
    return "<p>Account Page</p>"
    
    

if __name__ == '__main__':
    app.run(host='localhost', port=8080)