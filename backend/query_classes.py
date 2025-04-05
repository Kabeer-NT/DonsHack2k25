from bson.objectid import ObjectId


# This class was generated using assistance from ChatGPT 4.0

class ClassCollection:
    def __init__(self, collection):
        self.collection = collection

    # Find class by MongoDB _id
    def find_by_ID(self, class_id: str):
        try:
            return self.collection.find_one({"_id": ObjectId(class_id)})
        except Exception as e:
            print(f"Invalid ID or error occurred: {e}")
            return None

    # Add a student to 'students_taking'
    def add_student_taking(self, class_id: str, student_name: str):
        try:
            result = self.collection.update_one(
                {"_id": ObjectId(class_id)},
                {
                    "$addToSet": {"students_taking": student_name},
                    "$inc": {"num_students": 1}
                }
            )
            return result.modified_count
        except Exception as e:
            print(f"Error adding student: {e}")
            return 0

    # Remove a student from 'students_taking'
    def remove_student_taking(self, class_id: str, student_name: str):
        try:
            result = self.collection.update_one(
                {"_id": ObjectId(class_id)},
                {
                    "$pull": {"students_taking": student_name},
                    "$inc": {"num_students": -1}
                }
            )
            return result.modified_count
        except Exception as e:
            print(f"Error removing student: {e}")
            return 0

    # Add a student to 'students_interested'
    def add_student_interested(self, class_id: str, student_name: str):
        try:
            result = self.collection.update_one(
                {"_id": ObjectId(class_id)},
                {"$addToSet": {"students_interested": student_name}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error adding interested student: {e}")
            return 0

    # Remove a student from 'students_interested'
    def remove_student_interested(self, class_id: str, student_name: str):
        try:
            result = self.collection.update_one(
                {"_id": ObjectId(class_id)},
                {"$pull": {"students_interested": student_name}}
            )
            return result.modified_count
        except Exception as e:
            print(f"Error removing interested student: {e}")
            return 0
