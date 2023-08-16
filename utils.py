import random
import string

# Random string between 43 to 128 characters
def gen_random_string(length):
    text = ""
    possible = string.ascii_letters + string.digits
    
    for _ in range(length):
        text += random.choice(possible)
    
    return text