from flask import Flask, jsonify
from flask_cors import CORS

from dotenv import load_dotenv
import os

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from bson.objectid import ObjectId

from query_classes import ClassCollection
from query_user import UserCollection

load_dotenv()

uri = os.getenv("MONGODB_HOST")

client = MongoClient(uri, server_api=ServerApi('1'))
db = client["DonsHack"]

users_collection = db["users"]
classes_collection = db["classes"]

try:
    client.admin.command('ping')
    print("Connected to MongoDB")
except Exception as e:
    print(e)

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "Flask is working"})

# Testing finding classes by id
@app.route('/get-test-class')
def get_test_class():
    try:
        class_data = classes_collection.find_one({"_id": ObjectId('67f0e4148839b5b67e2ce4bb')})
        print("CLASS DATA:")
        print(class_data)
        return jsonify({"message": "Printed test class information"})
    except Exception as e:
        print(f"Error fetching class: {e}")
        return None

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080) # 0.0.0.0 so that this will work on expo go
