from dotenv import load_dotenv
from requests import post, get
from flask import jsonify
import random
import string
import base64
import os

load_dotenv()

#Globals
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8080/api/callback"
USER_INFO_URL = "https://api.spotify.com/v1/me"

def get_user_id(access_token):
    headers = get_auth_header(access_token)
    
    try:
        response = get(USER_INFO_URL, headers=headers)
        
        if response.status_code == 200:
            user_data = response.json()
            user_id = user_data.get("id")
            
            if user_id:
                return user_id
            else:
                return None
        else:
            return None
    
    except Exception as e:
        return None
        
    

# Random string between 43 to 128 characters
def gen_random_string(length):
    text = ""
    possible = string.ascii_letters + string.digits
    
    for _ in range(length):
        text += random.choice(possible)
    
    return text

def get_tokens(code):
    auth_string = CLIENT_ID + ":" + CLIENT_SECRET
    auth_bytes = auth_string.encode("ascii")
    base64_bytes = base64.b64encode(auth_bytes)
    base64_auth = base64_bytes.decode("ascii")
    
    url = "https://accounts.spotify.com/api/token"
    
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI
    }
    
    headers = {
        "Authorization": "Basic " + base64_auth,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    
    response = post(url=url, data=data, headers=headers)
    
    if response.status_code != 200:
        print(response.json())
        return
    
    json_result = response.json()
    print("Access Token info", json_result)
    
    return (json_result["access_token"], json_result["refresh_token"])

def filter_tracks(tracks):
    filtered_track_list = []
    
    for track in tracks:
        
        track_data = {
            "album_name" : track["album"]["name"],
            "album_images" : track["album"]["images"],
            "track_name" : track["name"],
            "track_id" : track["id"]
        }
        
        track_data["track_artists"] = []
        
        for artist in track["artists"]:
            track_data["track_artists"].append(artist["name"])
        
        filtered_track_list.append(track_data)
    
    return filtered_track_list

def filter_artists(artists):
    filtered_artist_list = []
    
    for artist in artists:
        
        artist_data = {
            "artist_name": artist["name"],
            "artist_images": artist["images"],
            "artist_id": artist["id"]
        }
        
        filtered_artist_list.append(artist_data)
    
    return filtered_artist_list
    
def get_auth_header(token):
    return {"Authorization": "Bearer " + token}