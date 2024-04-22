"use client";
import { useAuth } from "@/app/components/context/AuthContext";
import { processImage } from "@/app/api/upload";
import { useEffect, useState } from "react";
import { set } from "firebase/database";
import Loading from "../components/sections/loading";

export default function Upload() {
    const user = useAuth();
    const imageLinkPreset =
        "https://storage.googleapis.com/abstract-processed-image-bucket/processed-";

    const [imageLink, setImageLink] = useState<string | undefined>(undefined);
    const [imageType, setImageType] = useState<string>("P"); //set default image type to pixelate
    const [userFile, setUserFile] = useState<File | undefined>(undefined);
    const [userFileName, setUserFileName] = useState<string | undefined>(
        undefined
    );
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (loading) {
            document.body.style.cursor = "wait";
        } else {
            document.body.style.cursor = "default";
        }
    });

    async function fileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.item(0);
        if (file) {
            //refresh state
            setUserFile(file);
            setUserFileName(file.name);
        }
    }

    async function handleUpload(event: React.FormEvent) {
        setLoading(true);
        event.preventDefault();
        if (userFile) {
            const filename = await processImage(user, userFile, imageType);
            if (filename !== undefined) {
                setImageLink(imageLinkPreset + filename);
            }
        } else {
            alert("No File Selected");
        }
        setUserFile(undefined);
        setUserFileName(undefined);
        setLoading(false);
    }

    function handleSelection(event: React.ChangeEvent<HTMLSelectElement>) {
        const selection = event.target.value;
        setImageType(selection);
    }

    return (
        <div className="flex flex-col justify-center items-center max-w-screen">
            <form
                className="grow min-w-72 gap-3 justify-center items-center flex flex-row bg-white dark:bg-black text-black dark:text-white p-2"
                onSubmit={handleUpload}
            >
                <div className="flex flex-col gap-5">
                    <div className="flex justify-center items-center font-bold">
                        <p className="text-center text-nowrap font-sans bg-black text-white p-4 rounded-lg rounded-r-none h-14">
                            Select Genre
                        </p>
                        <div className="flex justify-center items-center border-[3px] border-black p-4 h-14 rounded-r-md font-sans">
                            <select
                                value={imageType}
                                id="image-type-select"
                                onChange={handleSelection}
                            >
                                <option value={"P"}>Pixelate</option>
                                <option value={"G"}>Grayscale</option>
                                <option value={"I"}>Invert</option>
                                <option value={"A"}>ASCII</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <label
                            htmlFor="image-upload"
                            className="border-[3px] py-2 border-black rounded-md font-sans text-lg font-bold hover:bg-black hover:text-white cursor-pointer"
                        >
                            {userFileName ? userFileName : "Select Image"}
                        </label>
                        <input
                            id="image-upload"
                            accept="image/*"
                            type="file"
                            className="hidden"
                            onClick={(
                                event: React.MouseEvent<
                                    HTMLInputElement,
                                    MouseEvent
                                >
                            ) => {
                                const element =
                                    event.target as HTMLInputElement;
                                element.value = "";
                            }}
                            onChange={fileSelect}
                        />

                        <label
                            htmlFor="image-submit"
                            className="border-[3px] py-2 border-black rounded-md font-sans text-lg font-bold hover:bg-black hover:text-white cursor-pointer"
                        >
                            Convert
                        </label>
                        <button
                            id="image-submit"
                            type="submit"
                            className="hidden"
                        />
                    </div>
                </div>
            </form>
            <div className="flex flex-col items-center mt-9">
                <p className="font-sans font-bold text-lg dark:text-white">
                    Image Preview
                </p>
                <div className="flex justify-center items-center rounded-md bg-gray-200 dark:bg-slate-800 mt-5 font-sans w-72 min-h-72 md:w-96 md:min-h-96">
                    {imageLink && (
                        <img
                            src={imageLink}
                            alt="art image"
                            className="rounded-md border-2 border-black"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
