import { User } from "firebase/auth";

export async function uploadImage(user: User | null, image: File) {
    const inputFileName = `${
        user?.uid ? user.uid : ""
    }-${Date.now()}.${image.name.split(".").pop()}`;

    try {
        const data = {
            inputFileName: inputFileName,
        };

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
        console.log("error: ", err);
    }
}
