"use client";
import { useAuth } from "@/app/components/context/AuthContext";
import { uploadImage } from "@/app/api/upload";

export default function Upload() {
    const user = useAuth();

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.item(0);

        if (file) {
            uploadImage(user, file);
        }

        event.target.files = null;
    };

    return (
        <>
            <label
                htmlFor="image-upload"
                className="bg-white border-black border-2 text-black p-2 rounded-md cursor-pointer"
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
        </>
    );
}
