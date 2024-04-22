import { AuthProvider } from "../components/context/AuthContext";
import Upload from "./upload";

export default function Discover() {
    return (
        <div className="flex flex-col justify-center text-center px-20 gap-4 max-w-screen">
            <h1 className="py-2 my-2 text-4xl dark:text-white bg-underline-stroke bg-no-repeat bg-bottom">
                    DISCOVER
                </h1>
            <div className="items-center flex flex-col">
            <h1 className="py-2 my-2 text-3xl dark:text-white">
                    PIXELATE IT
                </h1>
                <img className="border-2 border-black dark:border-orange-400 rounded-md size-1/2 md:size-1/3" src="./pixelNormal.png"></img>
                <h1 className="py-2 my-2 text-3xl dark:text-white">
                    ASCII IT
                </h1>
                <img className="border-2 border-black dark:border-orange-400 rounded-md size-1/2 md:size-1/3" src="./ASCIINormal.png"></img>
                </div>
                <div>
                <h1 className="py-2 mt-2 text-3xl dark:text-white">
                    ART IT
                </h1>
                <p className="mb-2 text-xl text-center text-balance font-sans dark:text-white">
                    Select a form of art and upload your image!
                </p>
                </div>
            <AuthProvider>
               <div className="my-2">
                <Upload />
               </div>
            </AuthProvider>
        </div>
    );
}
