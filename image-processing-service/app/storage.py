from google.cloud import storage
import os

RAW_BUCKET_NAME = 'abstract-raw-image-bucket'
PROCESSED_BUCKET_NAME = 'abstract-processed-image-bucket'
LOCAL_RAW_IMAGE_PATH = r"./rawImages"
LOCAL_PROCESSED_IMAGE_PATH = r"./processedImages"

def downloadRawImage(inputFileName):

    """
        Downloads the raw image to rawImages folder.
    """
    
    storage_client = storage.Client()

    bucket = storage_client.bucket(RAW_BUCKET_NAME)

    blob = bucket.blob(inputFileName)
    blob.download_to_filename(f"{LOCAL_RAW_IMAGE_PATH}/{inputFileName}")

    print(
        "Downloaded image {} from bucket {} to local folder {}.".format(
            inputFileName, RAW_BUCKET_NAME, f"{LOCAL_RAW_IMAGE_PATH}/{inputFileName}"
        )
    )



def saveProcessedImage(filename, image):
    """
    Saves the image to the local processed folder
    """
    image.save(f"{LOCAL_PROCESSED_IMAGE_PATH}/{filename}")



def deleteImage(filePath):
    """
        Deletes the image at the given file path.
    """

    os.remove(filePath)