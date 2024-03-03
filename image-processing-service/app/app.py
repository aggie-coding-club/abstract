from google.cloud import storage
from flask import Flask, request
from google.api_core.exceptions import NotFound
from google.resumable_media.common import InvalidResponse
import os
app = Flask(__name__)


os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "cloud-storage-key.json"


"""
    Downloads the raw image to the correct folder
"""


@app.route('/downloadimage', methods=["GET"])
def downloadRawImage():

    setupDirectories()

    uid = request.args.get('uid')
    time = request.args.get('time')

    storage_client = storage.Client()

    bucket = storage_client.get_bucket('abstract-raw-image-bucket')

    filetypes = ['.png', '.svg', '.jpg']

    for filetype in filetypes:
        blob = bucket.blob(uid + '-' + time + filetype)
        if blob.exists():
            blob.download_to_filename(
                'rawImages/' + uid + '-' + time + filetype)
            return 'Image was downloaded', 200
    return 'Image not found', 404


"""
    Creates the folders to hold the images 
"""


def setupDirectories():
    if not os.path.exists(r'rawImages'):
        os.makedirs(r'rawImages')
    if not os.path.exists(r'processedImages'):
        os.makedirs(r'processedImages')


"""
    Deletes the image from the correct folder
"""


def deleteImage(url):
    os.remove(url)


if __name__ == '__main__':
    app.run()
