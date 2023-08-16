import random
import string
import base64
import hashlib


def genCodeChallenge(codeVerifier):
    def base64Encode(data):
        return base64.urlsafe_b64encode(data).rstrip(b'=').decode('utf-8')
    
    encoder = hashlib.sha256()
    encoder.update(codeVerifier.encode('utf-8'))
    digest = encoder.digest()
    
    return base64Encode(digest)

# Random string between 43 to 128 characters
def genCodeVerifier(length):
    text = ""
    possible = string.ascii_letters + string.digits
    
    for _ in range(length):
        text += random.choice(possible)
    
    return text