from flask import Flask, request
from google.cloud import storage
import os
import datetime
import logging
from storage import *
from processing import pixelateImage
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./app/cloud-storage-key.json"


@app.before_request
def setupDirectories():
    """
        Creates the folders to hold the images 
    """

    if not os.path.exists(LOCAL_RAW_IMAGE_PATH):
        os.makedirs(LOCAL_RAW_IMAGE_PATH)
    if not os.path.exists(LOCAL_PROCESSED_IMAGE_PATH):
        os.makedirs(LOCAL_PROCESSED_IMAGE_PATH)


@app.route('/get-upload-url', methods=["PUT"])
def getUploadUrl():
    data = request.json
    if not data:
        return "Error: Filename not found", 400
    inputFileName = data.get("inputFileName")
    app.logger.info(inputFileName)

    storage_client = storage.Client()
    bucket = storage_client.bucket(RAW_BUCKET_NAME)
    blob = bucket.blob(inputFileName)

    try:
        url = blob.generate_signed_url(
            version="v4",
            expiration=datetime.timedelta(minutes=15),
            method="PUT"
        )
    except:
        return "Error generating signed url", 500

    return url , 200





# tested downloading and deleting
@app.route('/process-image', methods=["POST"])
def processImage():
    """
    Processes the image into a form of art
    """
    data = request.json
    inputFileName = data.get("inputFileName")
    outputFileName = f"processed-{inputFileName}"

    if not inputFileName:
        return "Error: Filename not found", 400

    downloadRawImage(inputFileName)

    # should be done after processing
    deleteImage(f"{LOCAL_RAW_IMAGE_PATH}/{inputFileName}")

    return "Image was processed", 200


if __name__ == '__main__':
    app.run(debug=True)
