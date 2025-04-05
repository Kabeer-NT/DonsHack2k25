import os

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

import json

from bson.objectid import ObjectId

load_dotenv()

uri = os.getenv("MONGODB_HOST")
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["DonsHack"]
users_collection = db["classes"]

with open("Classes_2025.json") as f:
    data = json.load(f)

print(json.dumps(data, indent=2))

if(isinstance(data, list)):
    result = users_collection.insert_many(data)
    print(f"inserted {len(result.inserted_ids)} records")
else:
    print("write failed")
