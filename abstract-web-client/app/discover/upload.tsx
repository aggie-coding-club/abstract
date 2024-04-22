"use client";
import { useAuth } from "@/app/components/context/AuthContext";
import { processImage } from "@/app/api/upload";
import { useState } from "react";

export default function Upload() {
    const user = useAuth();
    const imageLinkPreset =
        "https://storage.googleapis.com/abstract-processed-image-bucket/processed-";

    const [imageLink, setImageLink] = useState<string | undefined>(undefined);
    const [imageType, setImageType] = useState<string>("P"); //set default image type to pixelate
    const [userFile, setUserFile] = useState<File|undefined>(undefined);
    const [userFileName, setUserFileName] = useState<string|undefined>(undefined);
    async function fileSelect(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.item(0);
        if(file){
            //refresh state
            setUserFile(file)
            setUserFileName(file.name)
            console.log(file.name)
        }
    }


    async function handleUpload(event: React.FormEvent){
        console.log(document.getElementById("image-type-select"))
        event.preventDefault();
        if (userFile) {
            const filename = await processImage(user, userFile, imageType);
            if (filename !== undefined) {
                setImageLink(imageLinkPreset + filename);
            }
        }
        else{
            alert("No File Selected")
        }
        setUserFile(undefined);
        setUserFileName(undefined)
    }

   function handleSelection(event: React.ChangeEvent<HTMLSelectElement> ){
        const selection = event.target.value;
        setImageType(selection);
   }

    return (
        <> <div className="flex flex-row justify-center max-w-screen">
            <form
            className="grow min-w-72 gap-3 justify-center flex flex-row bg-white dark:bg-black border-black dark:border-white border-2 text-black dark:text-white p-2 rounded-md"
            onSubmit={handleUpload}
            >
            <label
                htmlFor="image-upload"
                className="grow shrink bg-white dark:bg-black border-black dark:border-white border-2 text-black dark:text-white p-2 rounded-md cursor-pointer"
            >
                {userFileName? userFileName: "Select Image"}
            </label>
            <input
                id="image-upload"
                accept="image/*"
                type="file"
                className="hidden"
                onClick={(event:React.MouseEvent<HTMLInputElement,MouseEvent>)=>{const element = event.target as HTMLInputElement
                element.value= ""
                }}
                onChange={fileSelect}
            />
            <select
                value={imageType}
                id="image-type-select"
                className="min-w-16 text-center grow shrink bg-white dark:bg-black border-black dark:border-white border-2 text-black dark:text-white rounded-md cursor-pointer"
                onChange={handleSelection}
            >
                <option value={"P"}>Pixel</option>
                <option value={"G"}>Grayscale</option>
                <option value={"I"}>Inverse</option>
                <option value={"A"}>ASCII</option>
            </select>
            <label
                htmlFor="image-submit"
                className="text-center grow shrink bg-white dark:bg-black border-black dark:border-white border-2 text-black dark:text-white p-2 rounded-md cursor-pointer"
            >
                Upload Image
            </label>
            <button
                id="image-submit"
                type="submit"
                className="hidden"
            />
            </form>
            </div>
            <div>
            <p className="mx-20 my-4 text-2xl text-center text-balance font-sans dark:text-white">
                    Image Preview
                </p>
            <div className="my-4 flex flex-row justify-center max-w-screen h-48">
                <div className="flex flex-col justify-center items-center rounded-md bg-gray-200 dark:bg-slate-800 w-1/2">
                    {imageLink && <img className="max-w-auto max-h-44 object-scale-down" src={imageLink} alt="processed image" />}
                </div>
            </div>   
            </div>   
        </>
    );
}
