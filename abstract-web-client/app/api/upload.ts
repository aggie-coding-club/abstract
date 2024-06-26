import { User } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

export async function processImage(
    user: User | null,
    image: File,
    imageType: string
) {
    const data = await uploadImage(user, image, imageType);
    try {
        const response = await fetch("http://10.10.103.14:8080/process-image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        return data.inputFileName;
    } catch (err) {
        console.error("ERROR:", err);
    }

    return undefined;
}

/**
 *
 * @param user - The user object, if it exists
 * @param image - The image the user is uploading
 * @returns The json of the filename of the image in the cloud storage bucket
 */
async function uploadImage(user: User | null, image: File, imageType: string) {
    const inputFileName = `${user?.uid ? user.uid : "null"}-${Date.now()}-${
        uuidv4().split("-")[0]
    }.${image.name.split(".").pop()}`; // USER ID - TIME IN SECONDS - RANDOM.EXTENSION

    const data = {
        inputFileName: inputFileName,
        imageType: imageType,
    };

    try {
        // fetch signed url
        const response = await fetch(
            "http://10.10.103.14:8080/get-upload-url",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        // upload image via signed url
        const url = await response.text();
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": image.type,
            },
            body: image,
        });
    } catch (err) {
        console.error("ERROR: ", err);
    }

    return data;
}
