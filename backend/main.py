from flask import Flask, redirect, request, session, make_response, jsonify
from flask_session import Session
from flask_cors import CORS
from utils import gen_random_string, get_tokens, get_user_id, get_jwt, decode_jwt
from dotenv import load_dotenv
from requests import get
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
SCOPE = "user-library-read user-read-recently-played user-top-read user-follow-read user-read-email user-read-private"
TIME_RANGES = ["short_term", "medium_term", "long_term"]


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
def call_back():
    
    code = request.args.get("code")
    state = request.args.get("state")
    stored_state = session.get("state")  
    
    # Dont allow user access without authorization
    if state is None or state != stored_state:
        return "<p>Unauthorized</p>"
    
    access_token, refresh_token = get_tokens(code)
    
    # Get User's Spotify ID
    user_id = get_user_id(access_token)
    if user_id:
        jwt = get_jwt(user_id, access_token, refresh_token)
        
        response = make_response(redirect("http://localhost:5173/analytics/top-tracks"))
        response.set_cookie("jwt", jwt, httponly=True)
        return response
    
    else:
       response = {
           "error": "Unauthorized",
           "message": "Failed to authorize"
       }
       
       return jsonify(response), 401
    
    # response = make_response(redirect("http://localhost:5173/analytics/top-tracks"))
    # response.set_cookie("access_token", access_token, httponly=True)
    # response.set_cookie("refresh_token", refresh_token, httponly=True)
    
    # return response

@app.route("/api/top-tracks/<time_range>", methods=["GET"])
def get_top_tracks(time_range):
    
    jwt_cookie = request.cookies.get("jwt")
    print(f"Cookie is: ", jwt_cookie)
    
    if not jwt_cookie:
        return jsonify({ "error": "Unauthorized", "message": "JWT invalid or missing."}), 401
    
    # Decode JWT and get access and refresh tokens
    access_token, refresh_token = decode_jwt(jwt_cookie)
    
    if not access_token or not refresh_token:
        return jsonify({ "message": "Unauthorized", "error": "Invalid JWT payload."})
    
    if time_range not in TIME_RANGES:
        response = {
            "error": "Bad Request",
            "message": "Invalid time range. Time range should be 'short_term', 'medium_term', or 'long_term'"
        }
        return jsonify(response), 400
        
    
    top_tracks = queries.get_user_top_tracks(access_token, time_range)
    return top_tracks


@app.route("/api/top-artists/<time_range>", methods=["GET"])
def get_top_artists(time_range):
    
    access_token = request.cookies.get("access_token")
    
    if not access_token:
        response = {
            "error": "Unauthorized",
            "message": "Access token is missing or invalid."
        }
        return jsonify(response), 401
    
    if time_range not in TIME_RANGES:
        response = {
            "error": "Bad Request",
            "message": "Invalid time range. Time range should be 'short_term', 'medium_term', or 'long_term'"
        }
        return jsonify(response), 400
    
    
    
    top_artists = queries.get_user_top_artists(access_token, time_range)
    return top_artists
    
    
if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=8080)