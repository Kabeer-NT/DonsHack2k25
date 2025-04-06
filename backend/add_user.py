import os

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv

from bson.objectid import ObjectId
from datetime import datetime


load_dotenv()

uri = os.getenv("MONGODB_HOST")
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["DonsHack"]

users = db["users"]
posts = db["posts"]
events = db["events"]

def create_event(username, title, content, tags=None, people_going=None):
    # Retrieve the user from the users collection by username
    user = users.find_one({"username": username})
    
    if not user:
        print(f"User with username {username} not found.")
        return None

    # If no tags or people going provided, initialize them as empty lists
    tags = tags or []
    people_going = people_going or []
    
    # Create a new post structure
    new_post = {
        "post_id": str(ObjectId()),  # Generate a unique post_id
        "poster_id": str(user["_id"]),  # User ID from users collection
        "poster_username": username,
        "poster_pfp": user.get("pfp", ""),  # Get pfp from user data
        "title": title,
        "content": content,
        "tags": tags,
        "people_going": people_going,
        "comments": []  # Start with no comments
    }

    # Insert the new post into the posts collection
    result = posts.insert_one(new_post)

    # Return the inserted post ID
    print(f"Post created with ID: {result.inserted_id}")
    return result.inserted_id

# Get current timestamp in ISO format
def get_iso_timestamp():
    return datetime.utcnow().isoformat() + "Z"

# Helper to get user details by username
def get_user_info(username):
    user = users.find_one({"username": username}, {"_id": 1, "pfp": 1})
    if user:
        return {"user_id": str(user["_id"]), "pfp": user["pfp"]}
    return None

# Add a comment to a post by title
def add_comment_by_post_title(post_title, comment_text, commenter_name):
    user = get_user_info(commenter_name)
    if not user:
        return 0  # user not found

    comment = {
        "username": commenter_name,
        "user_id": user["user_id"],  # Use user_id from user document
        "pfp": user["pfp"],
        "message": comment_text,
        "likes": [],
        "created_at": get_iso_timestamp(),
        "replies": []
    }

    result = posts.update_one(
        {"title": post_title},
        {"$push": {"comments": comment}}
    )
    return result.modified_count

# Add a reply to a comment message
def add_reply_by_comment_message(comment_message, reply_text, replier_name):
    user = get_user_info(replier_name)
    if not user:
        return 0  # user not found

    reply = {
        "username": replier_name,
        "user_id": user["user_id"],  # Use user_id from user document
        "pfp": user["pfp"],
        "message": reply_text,
        "likes": [],
        "created_at": get_iso_timestamp()
    }

    # Find post containing the comment
    post = posts.find_one({"comments.message": comment_message})
    if not post:
        return 0

    for comment in post.get("comments", []):
        if comment.get("message") == comment_message:
            comment.setdefault("replies", []).append(reply)
            break
    else:
        return 0

    # Write updated comments back to post
    result = posts.update_one(
        {"_id": post["_id"]},
        {"$set": {"comments": post["comments"]}}
    )
    return result.modified_count


# Helper function to find a user by username
def get_user_by_username(username: str):
    try:
        return users.find_one({"username": username})
    except Exception as e:
        print(f"Error finding user by username: {e}")
        return None

# Add all events where the poster_username matches the username to the user's events array
def add_events_to_user(username: str):
    user = get_user_by_username(username)
    if user:
        try:
            # Find all events where the poster_username matches the username
            events_to_add = events.find({"poster_username": username})
            event_ids = [str(event["_id"]) for event in events_to_add]

            if event_ids:
                # Add these events to the user's 'events' array
                result = users.update_one(
                    {"_id": user["_id"]},
                    {"$addToSet": {"events": {"$each": event_ids}}}
                )
                return result.modified_count
            else:
                print(f"No events found for user {username}")
                return 0
        except Exception as e:
            print(f"Error adding events to user: {e}")
            return 0
    else:
        print(f"User with username {username} not found")
        return 0

# Add all posts where the poster_username matches the username to the user's forum array
def add_posts_to_user(username: str):
    user = get_user_by_username(username)
    if user:
        try:
            # Find all posts where the poster_username matches the username
            posts_to_add = posts.find({"poster_username": username})
            post_ids = [str(post["_id"]) for post in posts_to_add]

            if post_ids:
                # Add these posts to the user's 'forum' array
                result = users.update_one(
                    {"_id": user["_id"]},
                    {"$addToSet": {"forum": {"$each": post_ids}}}
                )
                return result.modified_count
            else:
                print(f"No posts found for user {username}")
                return 0
        except Exception as e:
            print(f"Error adding posts to user: {e}")
            return 0
    else:
        print(f"User with username {username} not found")
        return 0

# Function to get a list of all usernames
def get_all_usernames():
    try:
        # Find all users and retrieve only the 'username' field
        usernames = users.find({}, {"username": 1})
        return [user["username"] for user in usernames]
    except Exception as e:
        print(f"Error fetching usernames: {e}")
        return []

for user in get_all_usernames():
    add_events_to_user(user)
    add_posts_to_user(user)
    print("Added posts for ", user)
# Close the connection
client.close()