from utils import get_auth_header, filter_tracks
from requests import get
import json

def get_user_top_tracks(token, time_range):
    url = f"https://api.spotify.com/v1/me/top/tracks?time_range={time_range}&limit=5"
    header = get_auth_header(token)
    
    response = get(url, headers=header)
    data = json.loads(response.text)
    
    filtered_tracks = filter_tracks(data["items"])
    
    
    return filtered_tracks