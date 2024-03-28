from firebase_admin import firestore
from firebase_admin import credentials
import firebase_admin


cred = credentials.Certificate("./firestore-key.json")

app = firebase_admin.initialize_app(cred)

db = firestore.Client()

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

def getUser(userId):
    if userId == "null":
        return None
    return db.collection(USER_COLLECTION).document(userId).get().to_dict()