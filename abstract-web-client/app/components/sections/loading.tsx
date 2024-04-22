export default function Loading() {
    return (
        <div className="absolute w-screen h-screen flex flex-col justify-center items-center z-10 bg-black bg-opacity-50">
            <div className="flex justify-center items-center">
                <svg
                    className="animate-spin h-10 w-10 text-black dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4V0C6.486 0 2 4.486 2 10h4zm2 5.291A8.001 8.001 0 014 12h4v3.291zm0-10.582V4H2c0 5.627 4.373 10 10 10v-4H6z"
                    ></path>
                </svg>
            </div>
            <p className="text-black dark:text-white">Loading...</p>
        </div>
    );
}
