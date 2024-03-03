from flask import Flask, request
import os
from storage import *
app = Flask(__name__)


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



# tested downloading and deleting
@app.route('/process-image', methods=["POST"])
def processImage():
    data = request.json
    inputFileName = data.get("inputFileName")

    if not inputFileName:
        return "Error: Filename not found", 400
    
    downloadRawImage(inputFileName)

    # should be done after processing
    deleteImage(f"{LOCAL_RAW_IMAGE_PATH}/{inputFileName}")


    return "stuff happened", 200



if __name__ == '__main__':
    app.run()