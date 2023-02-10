from flask import Flask, render_template, redirect, request, session, Response
from flask_session import Session
from random import randint
from passlib.context import CryptContext
from datetime import datetime


import json

from flask.json import load


app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

tweets = []

# Perus salasanan suojaus, jotta sitä ei tallenneta suoraan tietokantaan
pwd_context = CryptContext(
        schemes=["pbkdf2_sha256"],
        default="pbkdf2_sha256",
        pbkdf2_sha256__default_rounds=30000
)


def encrypt_password(password):
    return pwd_context.encrypt(password)


def check_encrypted_password(password, hashed):
    return pwd_context.verify(password, hashed)

def get_user(username):
    with open('users.json', 'r') as f:
        data = json.load(f)
        for u in data['users']:
            if u['username'] == username:
                return User(u['username'], u['password'])

    return None

def load_tweets_from_json():
    with open('tweets.json') as f:
        d = json.load(f)
        for p in d["tweets"]:
            tweets.append(Tweet(p['author'], p['message'], int(p['id']), p['time']))
        f.close()

@app.route("/")
def index():
    if not tweets: load_tweets_from_json()

    return render_template('index.html', len=len(tweets), tweets=tweets)

@app.route("/post", methods = ["POST"])
def post_tweet():

    data = request.json

    new_Tweet = Tweet(data['username'], data['description'])
    new_Tweet.insert() # Lisätään twiitti JSON tiedostoon
    tweets.insert(0, new_Tweet) # Lisätään twiitti `tweets`-listaan

    return new_Tweet.__dict__

@app.route("/register", methods = ["POST"])
def register():

    data = request.json

    if not data:
        return {"message":"Invalid data"}, 400

    if get_user(data['username']):
        return {"message":"Username already in use"}, 400

    new_user = User(data['username'], data['password'], new=True)
    new_user.insert()

    session['username'] = new_user.username


    return new_user.__dict__

@app.route("/login", methods = ["POST"])
def login():

    data = request.json

    if not data:
        return {"message": "Invalid data"}, 400

    user = get_user(data['username'])

    if not user:
        return {"message": "Username or password is incorrect"}, 400

    if not check_encrypted_password(data['password'], user.password):
        return {"message": "Username or password is incorrect"}, 400

    session['username'] = user.username

    return user.__dict__, 200

@app.route("/logout", methods =["POST"])
def logout():

    session.clear()

    return {"message": "Logged out"}, 200

class User():
    def __init__(self, username, password, new=False):
        self.username = username
        self.password = encrypt_password(password) if new else password # Jos käyttäjä ei ole uusi, ei salata salasanaa koska se on valmiiksi salattu.

    def insert(self):
        with open('users.json', 'r+') as f:
            file_data = json.load(f)
            file_data['users'].append(self.__dict__)
            
            f.seek(0)
            json.dump(file_data, f, indent=4)

class Tweet():
    def __init__(self, author: User, message, id = None, time = None):
        self.author = author
        self.message = message
        self.id = id if id else randint(1_000_000, 9_999_999) # Todellisessa sovelluksessa tähän lisättäisiin jonkunlainen tarkistus/logiikka ettei samaa ID:tä voi olla kahdella twiitillä. Noin 0.0009% (1 in 9 000 000) todennäköisyys tulla 2 samaa ID:tä
        self.time = time if time else str(datetime.now().strftime("%d %b")) # Jos aikaa ei ole asetettu, se tarkoittaa että tämä on uusi twiitti joten me lisätään tämänhetkinen aika siihen


    # Functiot jotta voidan pyytää tietoa twiitistä.
    def get_author(self) -> str:
        return self.author

    def get_message(self) -> str:
        return self.message

    def get_id(self) -> int:
        return self.id


    # Lisätään twiitti "tietokantaan", joka on tässä projektissa JSON-tiedosto. Oikeassa käytössä käytettäisiin esimerkiksi SQL tietokantaa.
    def insert(self):
        with open('tweets.json', 'r+') as f:

            file_data = json.load(f)
            file_data['tweets'].append(self.__dict__)

            f.seek(0)
            json.dump(file_data, f, indent=4)

