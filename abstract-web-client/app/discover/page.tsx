import { AuthProvider } from "../components/context/AuthContext";
import Upload from "./upload";

export default function Discover() {
    return (
        <div className="flex flex-col justify-center text-center px-20 gap-9 max-w-screen my-12">
            <div className="flex flex-col gap-3 justify-center items-center">
                <h1 className="py-3 md:py-4 md:my-2 text-2xl md:text-3xl dark:text-white bg-underline-stroke bg-no-repeat bg-bottom bg-contain">
                    PIXELATE IT
                </h1>
                <img
                    className="border-2 border-black dark:border-orange-400 rounded-md md:size-1/5"
                    src="./mona-lisa-pixelated.jpeg"
                />
            </div>
            <div className="flex flex-col gap-3 justify-center items-center ">
                <h1 className="py-2 md:py-4 md:my-2 text-2xl md:text-3xl dark:text-white bg-underline-stroke bg-no-repeat bg-bottom bg-contain">
                    ASCII IT
                </h1>
                <img
                    className="border-2 border-black dark:border-orange-400 rounded-md md:size-1/5"
                    src="./mona-lisa-ascii.png"
                />
            </div>
            <div className="flex flex-col gap-3 justify-center items-center ">
                {" "}
                <h1 className="py-2 md:py-4 md:my-2 text-2xl md:text-3xl dark:text-white bg-underline-stroke bg-no-repeat bg-bottom bg-contain">
                    ART IT
                </h1>
                <p className="mb-2 text-lg md:text-xl text-center text-balance font-sans dark:text-white">
                    Select a form of art and upload your image!
                </p>
                <AuthProvider>
                    <div className="my-2">
                        <Upload />
                    </div>
                </AuthProvider>
            </div>
        </div>
    );
}
