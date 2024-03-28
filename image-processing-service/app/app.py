from flask import Flask, request, jsonify
from google.cloud import storage
import os
import datetime
from storage import *
from processing import pixelateImage
from flask_cors import CORS
from firestore import isNewImage, setImage, getUser

app = Flask(__name__)
CORS(app)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./cloud-storage-key.json"


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
    imageId = inputFileName.split(".")[0]

    if not inputFileName:
        return "Error: Filename not found", 400

    if not isNewImage(imageId):
        deleteRawBucketImage(inputFileName)
        return "Error: Image already processing or processed", 400
    else:
        setImage(imageId, {
            "id": imageId,
            "filename": inputFileName,
            "status": "processing",
            "user": getUser(imageId.split("-")[0])
        })

    # download from bucket
    downloadRawImage(inputFileName)
    
    # convert to art
    pixelated_image = pixelateImage(f"{LOCAL_RAW_IMAGE_PATH}/{inputFileName}", 100)

    # save art
    downloadProcessedImage(outputFileName, pixelated_image)

    # upload to processed bucket
    uploadProcessedImage(outputFileName)

    # delete locally
    deleteRawImage(inputFileName)
    deleteProcessedImage(outputFileName)

    #delete uploaded raw bucket image
    deleteRawBucketImage(inputFileName)
    fileData = {
        "fileID": inputFileName.split(".")[0],
        "fileName": outputFileName
    }

    setImage(imageId, {
        'filename': outputFileName,
        'status': 'processed'
    })

    return jsonify(fileData), 200


if __name__ == '__main__':
    app.run(debug=True)
