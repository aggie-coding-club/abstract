"use client";
import { useAuth } from "@/app/components/context/AuthContext";
import { processImage } from "@/app/api/upload";
import { useState } from "react";

export default function Upload() {
    const user = useAuth();
    const imageLinkPreset =
        "https://storage.googleapis.com/abstract-processed-image-bucket/processed-";

    const [imageLink, setImageLink] = useState<string | undefined>(undefined);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);
        console.log("uploaded");

        if (file) {
            const filename = await processImage(user, file);
            if (filename !== undefined) {
                setImageLink(imageLinkPreset + filename);
            }
        }

        event.target.files = null;
    };

    return (
        <>
            <label
                htmlFor="image-upload"
                className="bg-white dark:bg-black border-black dark:border-white border-2 text-black dark:text-white p-2 rounded-md cursor-pointer"
            >
                Upload image
            </label>
            <input
                id="image-upload"
                accept="image/*"
                type="file"
                className="hidden"
                onChange={handleUpload}
            />
            {imageLink && <img src={imageLink} alt="processed image" />}
        </>
    );
}
