import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-black text-white text-sm text-center flex flex-col-reverse justify-center items-center gap-1 py-2 font-thin tracking-widest md:flex md:flex-row md:justify-between px-20">
            <div>made with 🤍</div>
            <div className="absolute left-0 right-0 mx-auto">
                Copyright &copy; abstract
            </div>
            <div className="flex justify-center items-center gap-x-2.5">
                <Link href={"https://github.com/aggie-coding-club/abstract"}>
                    <Image
                        src="./github_symbol.svg.svg"
                        width={18}
                        height={18}
                        alt="github"
                        className="md:w-[24px] md:h-[24px]"
                    />
                </Link>
                <Link href={"https://discord.com/invite/navrfhAYYV"}>
                    <Image
                        src="./discord_symbol.svg"
                        width={18}
                        height={14}
                        alt="discord"
                        className="md:w-[24px] md:h-[18.66px]"
                    />
                </Link>
            </div>
        </div>
    );
}
