import Link from "next/link";

export default function Home() {
    return (
        <main className="relative min-w-[320px] w-screen flex flex-col justify-between items-center">
            <>
                <div className="flex justify-center items-center bg-brush-stroke-2 bg-no-repeat bg-contain bg-center min-w-80 w-full min-h-36 mt-28">
                    <p className="text-[8.25vw] sm:text-[7vw] md:text-[3.25vw] tracking-[0.1em] text-nowrap -translate-y-2 translate-x-2">
                        Unlock your view
                    </p>
                </div>
                <Link
                    href={"/discover"}
                    className="font-sans font-semibold text-sm border-[1px] border-black py-2 px-8 rounded-md hover:bg-black hover:text-white"
                >
                    Get Started
                </Link>
            </>
            <div className=" w-full flex justify-between items-center mt-24">
                <img src="./left-flower.svg" className=" h-32 w-32" />
                <div className="flex flex-col items-center justify-center absolute left-1/2 transform -translate-x-1/2 -space-y-12 translate-y-[1.55rem]">
                    <img
                        src="./lightbulb.svg"
                        className=" h-14 w-14 flex-shrink-0 translate-x-3"
                    />
                    <img
                        src="./lil-bro.svg"
                        className=" h-24 w-24 flex-shrink-0"
                    />
                </div>
                <img src="./right-flower.svg" className="h-32 w-32" />
            </div>
        </main>
    );
}
