import random
import string
import base64
from requests import post

# Random string between 43 to 128 characters
def gen_random_string(length):
    text = ""
    possible = string.ascii_letters + string.digits
    
    for _ in range(length):
        text += random.choice(possible)
    
    return text

def get_token(client_id, client_secret, code, redirect_uri):
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("ascii")
    base64_bytes = base64.b64encode(auth_bytes)
    base64_auth = base64_bytes.decode("ascii")
    
    url = "https://accounts.spotify.com/api/token"
    
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri
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
    return json_result["access_token"]

def get_auth_header(token):
    return {"Authorization": "Bearer " + token}