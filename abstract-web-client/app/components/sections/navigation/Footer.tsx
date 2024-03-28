import Image from "next/image";
import Link from "next/link";


export default function Footer() {

    return (
        <div className="bg-black text-white py-2 w-320 space-y-2">
            <div className="flex justify-center gap-x-2.5 ">
                <Link href={"https://github.com/aggie-coding-club/abstract"} >
                    <Image src="./github_symbol.svg.svg"
                        width={18}
                        height={18}
                        alt="github"

                    />
                </Link>
                <Link href={"https://discord.com/invite/navrfhAYYV"}>
                    <div className="flex justify-center">
                        <Image src="./discord_symbol.svg"
                            width={18}
                            height={14}
                            alt="discord"
                        />
                    </div>
                </Link>
            </div>
            <p className="text-center">
                Copyright &copy; abstract
            </p>
            <p className="text-center">
                made with &#9829;
            </p>
        </div>
    );
}
