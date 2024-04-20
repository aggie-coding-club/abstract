from google.cloud import firestore
import os

db = firestore.Client()
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "app/firebase-admin-key.json"


IMAGE_COLLECTION = "images"
USER_COLLECTION = "users"

def getImage(imageId):
    snapshot = db.collection(IMAGE_COLLECTION).document(imageId).get()

    return snapshot

def isNewImage(imageId):
    image = getImage(imageId)
    return not image.exists

def setImage(imageId, imageDict):
    return db.collection(IMAGE_COLLECTION).document(imageId).set(imageDict, merge=True)

def deleteImageFromDb(imageId):
    return db.collection(IMAGE_COLLECTION).document(imageId).delete()

def getUser(userId):
    if userId == "null":
        return None
    return db.collection(USER_COLLECTION).document(userId).get().to_dict()