import Link from "next/link";

export default function Home() {
    return (
        <main className="relative min-w-[320px] w-screen h-full flex flex-col flex-1 justify-start items-center">
            <div className="flex flex-col justify-center items-center -space-y-5 md:space-y-10">
                <div className="flex justify-center items-center bg-brush-stroke-2 bg-no-repeat bg-contain bg-center w-80  h-36 md:w-[40rem] mt-28">
                    <p className="text-[1.65rem] md:text-[3rem] tracking-[0.1em] text-nowrap -translate-y-2 translate-x-2">
                        Unlock your view
                    </p>
                </div>
                <Link
                    href={"/discover"}
                    className="font-sans font-semibold text-sm md:text-lg border-[1px] border-black py-2 px-8 rounded-md bg-black text-white hover:bg-white hover:text-black flex-grow-0"
                >
                    Get Started
                </Link>
            </div>
            <div className="h-60"></div> {/* Placeholder div */}
            <div className="w-full flex justify-between items-center absolute bottom-0 md:px-20">
                <img
                    src="./left-flower.svg"
                    className=" h-32 w-32 md:h-80 md:w-80 flex-shrink-0"
                />
                <div className="flex flex-col items-center justify-center absolute left-1/2 transform -translate-x-1/2 -space-y-12 md:-space-y-[5.1rem] translate-y-[1.55rem] md:translate-y-[5.4rem]">
                    <img
                        src="./lightbulb.svg"
                        className=" h-14 w-14 md:h-28 md:w-28 flex-shrink-0 translate-x-3 md:translate-x-6"
                    />
                    <img
                        src="./lil-bro.svg"
                        className=" h-24 w-24 md:h-40 md:w-40 flex-shrink-0"
                    />
                </div>
                <img
                    src="./right-flower.svg"
                    className="h-32 w-32 md:h-80 md:w-80 flex-shrink-0"
                />
            </div>
        </main>
    );
}
