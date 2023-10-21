from flask import Flask, redirect, request, session, make_response, jsonify
from flask_session import Session
from flask_cors import CORS
from utils import gen_random_string, get_tokens, get_user_id, get_jwt, get_auth_header, filter_tracks, filter_artists
from dotenv import load_dotenv
from requests import get
import jwt, os, json

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
    print("redirecting")
    return redirect(spotify_authorize_url, code=302)


@app.route("/api/callback", methods=["GET"])
def call_back():
    
    code = request.args.get("code")
    state = request.args.get("state")
    stored_state = session.get("state")  
    
    # Dont allow user access without authorization
    if state is None or state != stored_state:
        return "<p>Unauthorized</p>"
    
    
    try:
        access_token, refresh_token = get_tokens(code)
        print("Access Token: ", access_token)
        if not access_token or not refresh_token:
            # Invalid token handling is deferred to except block
            pass
        
        user_id = get_user_id(access_token)
        print("User ID: ", user_id)
        
        if user_id:
            jwt = get_jwt(user_id, access_token, refresh_token)
            redirect_url = f"http://localhost:5173/analytics/top-tracks?jwt={jwt}"
            
            return redirect(redirect_url, code=302)
        else:
            return jsonify({ "error": "Unauthorized", "message": "Failed to generate JWT"}), 401
        
    except Exception as e:
        return jsonify({ "error": "Unauthorized", "message": "An error occured during token retrieval"}), 500
    

@app.route("/api/top-tracks/<time_range>", methods=["GET"])
def get_top_tracks(time_range):
    print("TOP of GTT")
    if time_range not in TIME_RANGES:
        return jsonify({ "error": "Bad Request", "message": "Invalid time range. Time range should be 'short_term', 'medium_term', or 'long_term'" }), 400
    
    authorization_header = request.headers.get("Authorization")
    
    if not authorization_header:
        return jsonify({ "error": "Unauthorized", "message": "JWT invalid or missing from the header."}), 401
    
    try:
        jwt_token = authorization_header.split("Bearer ")[1]
        
        payload = jwt.decode(jwt_token, os.getenv("SECRET_KEY"), algorithms=["HS256"])
        access_token, refresh_token = payload.get("access_token"), payload.get("refresh_token")
        
    except jwt.ExpiredSignatureError:
        return jsonify({ "error": "Unauthorized", "message": "JWT has expired."}), 401
    except jwt.DecodeError:
        return jsonify({ "error": "Unauthorized", "message": "Failed to decode JWT."}), 401
    
    
    # Fetch User's top tracks from spotify
    try:
        print("Trying to fetch users top tracks")
        url = f"https://api.spotify.com/v1/me/top/tracks?time_range={time_range}&limit=5"
        headers = get_auth_header(access_token)
        
        response = get(url, headers=headers)
        
        if response.status_code == 200:
            data = json.loads(response.text)
            
            return filter_tracks(data["items"])
        else:
            return jsonify({ "error": "Bad Request", "message": "Failed to fetch top tracks from Spotify."})
    
    except Exception as e:
        return jsonify({ "error": "Internal Server Error", "message": str(e)}), 500


@app.route("/api/top-artists/<time_range>", methods=["GET"])
def get_top_artists(time_range):
    print("TOP of GTA")
    if time_range not in TIME_RANGES:
        return jsonify({ "error": "Bad Request", "message": "Invalid time range. Time range should be 'short_term', 'medium_term', or 'long_term'" }), 400
    
    authorization_header = request.headers.get("Authorization")
    
    if not authorization_header:
        return jsonify({ "error": "Unauthorized", "message": "JWT invalid or missing from the header."}), 401
    
    try:
        jwt_token = authorization_header.split("Bearer ")[1]
        
        payload = jwt.decode(jwt_token, os.getenv("SECRET_KEY"), algorithms=["HS256"])
        access_token, refresh_token = payload.get("access_token"), payload.get("refresh_token")
        
    except jwt.ExpiredSignatureError:
        return jsonify({ "error": "Unauthorized", "message": "JWT has expired."}), 401
    except jwt.DecodeError:
        return jsonify({ "error": "Unauthorized", "message": "Failed to decode JWT."}), 401
    
    
    # Fetch User's top artists from spotify
    try:
        print("Trying to fetch users top artists")
        url = f"https://api.spotify.com/v1/me/top/artists?time_range={time_range}&limit=5"
        headers = get_auth_header(access_token)
        
        response = get(url, headers=headers)
        
        if response.status_code == 200:
            data = json.loads(response.text)
            
            return filter_artists(data["items"])
        else:
            return jsonify({ "error": "Bad Request", "message": "Failed to fetch top artists from Spotify."})
    
    except Exception as e:
        return jsonify({ "error": "Internal Server Error", "message": str(e)}), 500
    
    
if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=8080)