import Link from "next/link";

export default function Home() {
    return (
        <main className="w-screen h-screen flex flex-col justify-start items-center">
            <div className="flex justify-center items-center bg-brush-stroke-2 bg-no-repeat bg-contain bg-center w-80 h-36 mt-28">
                <p className="text-[1.65rem] tracking-[0.1em] text-nowrap -translate-y-2 translate-x-2">
                    Unlock your view
                </p>
            </div>
            <Link
                href={"/discover"}
                className="font-sans font-semibold text-sm border-[1px] border-black py-2 px-8 rounded-md hover:bg-black hover:text-white"
            >
                Get Started
            </Link>
        </main>
    );
}
