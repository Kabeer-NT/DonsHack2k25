from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

from bson.objectid import ObjectId
from datetime import datetime

from query_classes import ClassCollection

import json

load_dotenv()

import os
uri = os.getenv("MONGODB_HOST")
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["DonsHack"]

users = db["users"]
posts = db["posts"]
events = db["events"]
classes = db["classes"]

class UserCollection:
    def __init__(self, collection):
        self.collection = collection

    # Function to get my events
    def get_events(self):
        try:
            # Hardcoding the username as "Mario"
            username = "Mario"
            
            # Fetch Mario's user document
            mario = users.find_one({"username": username})
            
            if mario:
                # Extract the event IDs from Mario's 'events' field
                event_ids = mario.get("events", [])
                
                # Retrieve the events from the events collection
                events_list = []
                for event_id in event_ids:
                    event = events.find_one({"_id": ObjectId(event_id)})
                    if event:
                        events_list.append(event)
                return events_list
            
            else:
                print(f"User {username} not found.")
                return []
        
        except Exception as e:
            print(f"Error retrieving Mario's events: {e}")
            return []

    # Function to get Mario's posts (username hardcoded)
    def get_posts():
        try:
            # Hardcoding the username as "Mario"
            username = "Mario"
            
            # Fetch Mario's user document
            mario = users.find_one({"username": username})
            
            if mario:
                # Extract the post IDs from Mario's 'posts' field
                post_ids = mario.get("posts", [])
                
                # Retrieve the posts from the posts collection
                posts_list = []
                for post_id in post_ids:
                    post = posts.find_one({"_id": ObjectId(post_id)})
                    if post:
                        posts_list.append(post)
                return posts_list
            
            else:
                print(f"User {username} not found.")
                return []
        
        except Exception as e:
            print(f"Error retrieving Mario's posts: {e}")
            return []
        
    import json

    def get_classes_taking():
        try:
            # Hardcoding the username as "Mario"
            username = "Mario"
            
            # Fetch Mario's user document
            mario = users.find_one({"username": username})
            
            if mario:
                # Extract the class IDs from Mario's 'classes.taking' field
                classes_taking_ids = mario.get("classes", {}).get("taking", [])
                
                # Retrieve the classes from the classes collection
                classes_taking_list = []
                for class_id in classes_taking_ids:
                    class_info = classes.find_one({"class_id": class_id})
                    if class_info:
                        classes_taking_list.append(class_info)
                
                # Convert the list to a JSON string and return
                return json.dumps(classes_taking_list, default=str)
            
            else:
                print(f"User {username} not found.")
                return json.dumps([])  # Return an empty list as JSON
        
        except Exception as e:
            print(f"Error retrieving Mario's classes (taking): {e}")
            return json.dumps([])  # Return an empty list as JSON

    def get_classes_interested():
        try:
            # Hardcoding the username as "Mario"
            username = "Mario"
            
            # Fetch Mario's user document
            mario = users.find_one({"username": username})
            
            if mario:
                # Extract the class IDs from Mario's 'classes.interested' field
                classes_interested_ids = mario.get("classes", {}).get("interested", [])
                
                # Retrieve the classes from the classes collection
                classes_interested_list = []
                for class_id in classes_interested_ids:
                    class_info = classes.find_one({"class_id": class_id})
                    if class_info:
                        classes_interested_list.append(class_info)
                
                # Convert the list to a JSON string and return
                return json.dumps(classes_interested_list, default=str)
            
            else:
                print(f"User {username} not found.")
                return json.dumps([])  # Return an empty list as JSON
        
        except Exception as e:
            print(f"Error retrieving Mario's classes (interested): {e}")
            return json.dumps([])  # Return an empty list as JSON

    # Get Marios Events in a list in JSON format
    # Get marios posts in a list in Json Format
    # Get Marios Classes (separate for taking and interested) 
    # Get all of Mario's friends list and ! friends list 
    # Get each friends class list taken and interested
    # Get all classes (Query Class)
    # Given a person, add/remove from friends list

    #given some class information return people taking/interested in said class
    #given some class information add/remove Mario's taking/interested && add class to mario's taking/interested list, update num people too
