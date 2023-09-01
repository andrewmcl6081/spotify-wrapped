from utils import get_auth_header
from requests import get
import json

def get_user_top_tracks(token, type, time_range):
    url = f"https://api.spotify.com/v1/me/top/{type}?time_range={time_range}&limit=5"
    print(url)
    header = get_auth_header(token)
    
    response = get(url, headers=header)
    data = json.loads(response.text)
    
    
    data = data["items"]
    filtered_data = []
    
    for track in data:
        
        extracted_track_data = {
            "album_name" : track["album"]["name"],
            "album_images" : track["album"]["images"],
            "track_name" : track["name"],
            "track_id" : track["id"],
            "track_artists" : []
        }
        
        for artist in track["artists"]:
            extracted_track_data["track_artists"].append(artist["name"])
        
        filtered_data.append(extracted_track_data)
        
    
    return filtered_data