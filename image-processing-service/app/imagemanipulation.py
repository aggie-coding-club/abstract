from PIL import Image, ImageOps
from storage import LOCAL_RAW_IMAGE_PATH, LOCAL_PROCESSED_IMAGE_PATH
import numpy as np
"""

function that applies a simple blur effect to an image

"""


def pixelImage(image_path, pixel_size):
    image = Image.open(image_path)

    width, height = image.size
    new_width = width // pixel_size
    new_height = height // pixel_size
    # resize the image to a smaller size, Image.NEAREST ignores some pixels
    resized_image = image.resize((new_width, new_height), Image.NEAREST)
    # resize the image to the original size, Image.NEAREST selects the nearest original pixel to the new pixel and copies it over
    pixel_art = resized_image.resize((width, height), Image.NEAREST)

    filename = image_path.split("/")[-1]

    saveImage(filename, pixel_art)


def grayscaleImage(image_path):
    image = Image.open(image_path)
    gray_image = ImageOps.grayscale(image)
    filename = image_path.split("/")[-1]

    saveImage(filename, gray_image)


def invertImage(image_path):
    image = Image.open(image_path)
    gray_image = ImageOps.invert(image)
    filename = image_path.split("/")[-1]

    saveImage(filename, gray_image)


def saveImage(filename, pixel_art):
    pixel_art.save(f"{LOCAL_PROCESSED_IMAGE_PATH}/{filename}")


pixelImage("rawImages/image.png", 3)
