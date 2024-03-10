from PIL import Image, ImageOps


def pixelateImage(image_path, pixel_size):
    '''
    Pixelates an image
    '''
    image = Image.open(image_path)

    width, height = image.size
    new_width = width // pixel_size
    new_height = height // pixel_size
    # resize the image to a smaller size, Image.NEAREST ignores some pixels
    resized_image = image.resize((new_width, new_height), Image.NEAREST)
    # resize the image to the original size, Image.NEAREST selects the nearest original pixel to the new pixel and copies it over
    pixel_art = resized_image.resize((width, height), Image.NEAREST)

    return pixel_art


def grayscaleImage(image_path):
    '''
    Grayscales an image
    '''
    image = Image.open(image_path)
    gray_image = ImageOps.grayscale(image)

    return gray_image


def invertImage(image_path):
    '''
    Negates the image
    '''
    image = Image.open(image_path)
    inverted_image = ImageOps.invert(image)

    return inverted_image


