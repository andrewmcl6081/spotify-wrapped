import random
import string
import base64
import os
from requests import post
from dotenv import load_dotenv

load_dotenv()

#Globals
CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
REDIRECT_URI = "http://localhost:8080/analytics"

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
    tokens = (json_result["access_token"], json_result["refresh_token"])
    
    return tokens

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}