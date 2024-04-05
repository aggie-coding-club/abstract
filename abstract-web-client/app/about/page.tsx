export default function About() {
    return (<div>
        <div className="flex flex-col place-items-center">
            <h1 className="h-12 text-4xl">About</h1>
            <div>
            <p className="mx-20 text-center text-balance font-sans">abstract is an image to art tool that lets you convert an image into <b>any</b> form of art!</p>
            </div>
            <div className="size-96 flex flex-col place-items-center justify-center">
                <img className="border-4 border-slate-300 rounded-md"src="./halfLebronpixel.jpg"/>
            </div>
            <h1 className="h-12 text-4xl">Team</h1>
            <div>
            <p className="mx-20 text-center text-balance font-sans">This wonderful project was made possible by the Aggie Coding Club at Texas A&M University.</p>
            </div>
            <div className="size-96 flex flex-col place-items-center justify-center">
                <img className="border-4 border-slate-300 rounded-md"src="./pixelTeam.jpg"/>
            </div>
            </div>
        </div>);
}
