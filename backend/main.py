from flask import Flask, jsonify
from flask_cors import CORS

from dotenv import load_dotenv
import os

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()

uri = os.getenv("MONGODB_HOST")

client = MongoClient(uri, server_api=ServerApi('1'))
db = client["users"]

try:
    client.admin.command('ping')
    print("Connected to MongoDB")
except Exception as e:
    print(e)

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Flask is working"})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080) # 0.0.0.0 so that this will work on expo go
