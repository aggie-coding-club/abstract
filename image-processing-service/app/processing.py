from PIL import Image, ImageOps, ImageDraw, ImageFont
import numpy as np
import cv2

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


def grayscaleImage(image_path, usingPath=False):
    '''
    Grayscales an image
    '''
    if(usingPath):
        image = Image.open(image_path)
        gray_image = ImageOps.grayscale(image)
    else:
        gray_image = ImageOps.grayscale(image_path)

    return gray_image


def invertImage(image_path):
    '''
    Negates the image
    '''
    image = Image.open(image_path)
    # inverted_image = ImageOps.invert(image)

    # return inverted_image
    if image.mode in {'P', 'PA'}:
        pmode, pal = image.palette.getdata()
        pal = Image.frombytes(pmode, (len(pal) // len(pmode), 1), pal)
        image = image.copy()
        image.palette.palette = ImageOps.invert(pal).tobytes()
        return image
    elif image.mode in {'LA', 'La', 'RGBA', 'RGBa', 'RGBX'}:
        return image.point([*range(255, -1, -1)] * (len(image.mode) - 1) + [*range(256)])
    else:
        # This may fail
        return image.point(lambda x: 255-x)


def resize(image, new_width=100):
    old_width, old_height = image.size
    new_height = new_width * old_height // old_width
    return image.resize((new_width, new_height))


def asciiArtImage(image_path, high_quality=False):
    '''
    Converts an image to ascii art, high_quality=True will take longer to convert to image
    '''

    ASCII_CHARS = ["@", "#", "$", "%", "?", "*", "+", ";", ":", ",", "."]

    ascii_string = ""
    # resize so it does not take so long to convert to png
    if (high_quality == False):
        image = resize(image=Image.open(image_path), new_width=100)
    else:
        image = Image.open(image_path)
    new_image = grayscaleImage(image)
    new_image_data = new_image.getdata()
    # loop through each pixel value
    for pixel in new_image_data:
        ascii_string += ASCII_CHARS[pixel // 25]
    ascii_img = ""
    for i in range(0, len(ascii_string), new_image.width):
        ascii_img += ascii_string[i:i + new_image.width] + "\n"
    # with open("ascii_image.txt", "w") as f:
    #     f.write(ascii_img)

    # print(new_image.size)  # W H

    if (high_quality):
        image = np.zeros(
            (int(new_image.size[1] * 13), int(new_image.size[0] * 5)), dtype=np.uint8)  # H W
    else:
        image = np.zeros(
            (int(new_image.size[1] * 13.2), int(new_image.size[0] * 5.1)), dtype=np.uint8)  # H W
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    ascii_image_png = Image.fromarray(image)

    font = ImageFont.truetype(
        r'unifont.otf', 10)
    draw = ImageDraw.Draw(ascii_image_png)
    draw.text((5, 5), ascii_img, font=font)

    #ascii_image_png.save("image.png")
    return ascii_image_png


