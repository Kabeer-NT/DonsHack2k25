# from pymongo.collection import Collection
from bson.objectid import ObjectId

class UserCollection:
    def __init__(self, collection):
        self.collection = collection

    # Find user by user_id
    def find_by_user_id(self, user_id: str):
        try:
            return self.collection.find_one({"user_id": user_id})
        except Exception as e:
            print(f"Error fetching user: {e}")
            return None

    # Get user details (including username, pfp, etc.)
    def get_user_details(self, user_id: str):
        user = self.find_by_user_id(user_id)
        if user:
            return {
                "user_id": user.get("user_id"),
                "username": user.get("username"),
                "pfp": user.get("pfp"),
                "tags": user.get("tags", {}),
                "friends": user.get("friends", []),
                "classes": user.get("classes", {}),
                "posts": user.get("posts", {}),
                "conversations": user.get("conversations", [])
            }
        return None

    # Update user details
    def update_user_details(self, user_id: str, updates: dict):
        try:
            result = self.collection.update_one({"user_id": user_id}, {"$set": updates})
            return result.modified_count
        except Exception as e:
            print(f"Error updating user: {e}")
            return 0

    # Add a new conversation for the user
    def add_conversation(self, user_id: str, conversation_id: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$addToSet": {"conversations": conversation_id}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error adding conversation: {e}")
            return 0

    # Remove a conversation for the user
    def remove_conversation(self, user_id: str, conversation_id: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$pull": {"conversations": conversation_id}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error removing conversation: {e}")
            return 0

    # Add a tag to the user
    def add_tag(self, user_id: str, category: str, tag: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$addToSet": {f"tags.{category}": tag}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error adding tag: {e}")
            return 0

    # Remove a tag from the user
    def remove_tag(self, user_id: str, category: str, tag: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$pull": {f"tags.{category}": tag}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error removing tag: {e}")
            return 0

    # Add a friend to the user
    def add_friend(self, user_id: str, friend_user_id: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$addToSet": {"friends": friend_user_id}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error adding friend: {e}")
            return 0

    # Remove a friend from the user
    def remove_friend(self, user_id: str, friend_user_id: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$pull": {"friends": friend_user_id}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error removing friend: {e}")
            return 0

    # Add a class to the 'taking' list
    def add_class_taking(self, user_id: str, class_id: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$addToSet": {"classes.taking": class_id}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error adding class to taking list: {e}")
            return 0

    # Remove a class from the 'taking' list
    def remove_class_taking(self, user_id: str, class_id: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$pull": {"classes.taking": class_id}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error removing class from taking list: {e}")
            return 0

    # Add a class to the 'interested' list
    def add_class_interested(self, user_id: str, class_id: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$addToSet": {"classes.interested": class_id}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error adding class to interested list: {e}")
            return 0

    # Remove a class from the 'interested' list
    def remove_class_interested(self, user_id: str, class_id: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$pull": {"classes.interested": class_id}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error removing class from interested list: {e}")
            return 0

    # Add a post to the user's 'events' or 'forum' posts
    def add_post(self, user_id: str, category: str, post_id: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$addToSet": {f"posts.{category}": post_id}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error adding post: {e}")
            return 0

    # Remove a post from the user's 'events' or 'forum' posts
    def remove_post(self, user_id: str, category: str, post_id: str):
        try:
            result = self.collection.update_one(
                {"user_id": user_id},
                {"$pull": {f"posts.{category}": post_id}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error removing post: {e}")
            return 0
