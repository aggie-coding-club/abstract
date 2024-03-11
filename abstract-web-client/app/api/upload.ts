import { User } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

export async function processImage(user: User | null, image: File) {
    const data = await uploadImage(user, image);

    try {
        await fetch("http://127.0.0.1:5000/process-image", {
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
async function uploadImage(user: User | null, image: File) {
    const inputFileName = `${user?.uid ? user.uid : ""}-${Date.now()}-${
        uuidv4().split("-")[0]
    }.${image.name.split(".").pop()}`; // USER ID - TIME IN SECONDS - RANDOM.EXTENSION

    const data = {
        inputFileName: inputFileName,
    };

    try {
        // fetch signed url
        const response = await fetch("http://127.0.0.1:5000/get-upload-url", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // upload image via signed url
        const url = await response.text();

        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": image.type,
            },
            body: image,
        });

        alert("uploaded baby");
    } catch (err) {
        console.error("ERROR: ", err);
    }

    return data;
}
