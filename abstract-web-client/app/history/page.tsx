"use client";
import { useAuth } from "../components/context/AuthContext";
import React from "react";
import { getImages } from "../firebase/firebase";

export default function History() {
    const user = useAuth();
    const [images, setImages] = React.useState(Array<string>);

    if (user) {
        if (images.length === 0) {
            getImages(user).then((result) => {
                if (result) {
                    const imageLinks: string[] = result;
                    console.log(imageLinks);
                    setImages(imageLinks);
                }
            });
        }
        return (
            <div className="flex flex-col justify-center place-items-center">
                <h1 className="py-5 text-4xl dark:text-white bg-underline-stroke bg-no-repeat bg-bottom bg-contain mb-12">
                    Art History
                </h1>
                <div className="flex flex-row flex-wrap justify-center">
                    {images.map((image, index) => (
                        <div
                            className="mx-2 my-2 size-56 bg-black flex flex-col justify-center place-items-center rounded-md bg-gradient-to-b from-slate-300 via-blue-500 to-slate-300 dark:bg-gradient-to-b dark:from-orange-400 dark:via-yellow-400 dark:to-orange-400"
                            key={index}
                        >
                            <img
                                className="size-52 object-scale-down"
                                src={image}
                                alt={`Saved Picture ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        401 Unauthorized
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="text-center">
                        <p className="text-sm leading-5 text-black ">
                            You are not authorized to access this resource.
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
