export default function About() {
    return (
        <div className="flex flex-col justify-center items-center dark:bg-black gap-7 my-12">
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="py-2 text-3xl dark:text-white bg-underline-stroke bg-no-repeat bg-bottom">
                    About
                </h1>
                <p className="mx-20 text-center text-balance font-sans dark:text-white">
                    abstract is an image to art tool that lets you convert an
                    image into <b>any</b> form of art!
                </p>
                <img
                    className="border-2 border-black dark:border-orange-400 rounded-md size-1/2 md:size-1/3"
                    src="./halfLebronpixel.jpg"
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="py-2 text-3xl dark:text-white bg-underline-stroke bg-no-repeat bg-bottom">
                    Team
                </h1>
                <p className="mx-20 text-center text-balance font-sans dark:text-white">
                    This wonderful project was made possible by the Aggie Coding
                    Club at Texas A&M University.
                </p>
                <img
                    className="border-2 border-black dark:border-orange-400 rounded-md size-3/4 md:size-1/4"
                    src="./pixelTeam.jpg"
                />
            </div>
        </div>
    );
}
