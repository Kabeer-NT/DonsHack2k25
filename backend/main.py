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

users = UserCollection(users_collection)
classes = ClassCollection(classes_collection)

try:
    client.admin.command('ping')
    print("Connected to MongoDB")
except Exception as e:
    print(e)

app = Flask(__name__)

# Converts all ObjectIds to strs so doc will be JSON serializable
def convert_objectid_to_str(doc):
    if isinstance(doc, dict):  # Check if doc is a dictionary
        for key, value in doc.items():
            if isinstance(value, ObjectId):  # If the value is an ObjectId
                doc[key] = str(value)  # Convert it to string
            elif isinstance(value, list):  # If the value is a list, check its items
                doc[key] = [convert_objectid_to_str(item) if isinstance(item, dict) else item for item in value]
    elif isinstance(doc, list):  # If doc is a list, check each item
        for i in range(len(doc)):
            if isinstance(doc[i], dict):
                doc[i] = convert_objectid_to_str(doc[i])
    return doc

@app.route('/')
def home():
    return jsonify({"message": "Flask is working"})

# Testing finding classes by id
@app.route('/get-test-class')
def get_test_class(id):
    try:
        class_data = classes.find_by_ID(id)
        class_data = convert_objectid_to_str(class_data)
        return jsonify(class_data)
    except Exception as e:
        print(f"Error fetching class: {e}")
        return None
    
@app.route('/get-my-class-taking-list')
def get_my_class_taking_list():
    data = UserCollection.get_classes_taking()
    print("TAKING DATA: ", data)
    return data

@app.route('/get-my-class-interested-list')
def get_my_class_interested_list():
    data = UserCollection.get_classes_interested()
    print("INTERESTED DATA: ", data)
    return data


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080) # 0.0.0.0 so that this will work on expo go
