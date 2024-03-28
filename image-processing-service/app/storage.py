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

def downloadProcessedImage(filename, image):
    """
    Saves the image to the local processed folder
    """

    image.save(f"{LOCAL_PROCESSED_IMAGE_PATH}/{filename}")

def uploadProcessedImage(filename):
    """
    Saves the image to processed cloud storage bucket
    """

    storage_client = storage.Client()
    bucket = storage_client.bucket(PROCESSED_BUCKET_NAME)
    blob = bucket.blob(filename)
    blob.upload_from_filename(f"{LOCAL_PROCESSED_IMAGE_PATH}/{filename}")
    blob.make_public()

def deleteImage(filePath):
    """
        Deletes the image at the given file path.
    """

    os.remove(filePath)

def deleteRawBucketImage(filePath):
    """
        Deletes image at filePath from the raw images bucket.
    """

    storage_client = storage.Client()
    bucket = storage_client.bucket(RAW_BUCKET_NAME)
    bucket.blob(filePath).delete()
    print("Raw Image Deleted from Cloud Bucket")

def deleteRawImage(filename):
    """
    Deletes image in local raw image folder
    """

    deleteImage(f"{LOCAL_RAW_IMAGE_PATH}/{filename}")


def deleteProcessedImage(filename):
    """
    Deletes image in local processed image folder
    """

    deleteImage(f"{LOCAL_PROCESSED_IMAGE_PATH}/{filename}")
