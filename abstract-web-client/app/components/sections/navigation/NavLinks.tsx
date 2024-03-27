"use client";
import Link from "next/link";
import Image from "next/image";
import { use, useState } from "react";
import { usePathname } from "next/navigation";

export type NavLink = {
    name: string;
    href: string;
};

export default function NavLinks(props:any) {
    console.log(props.user)
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const pathname = usePathname();
    const handleClick = () => {
        // Only toggle the menu if the screen size is smaller than sm
        if (window.innerWidth < 640) {
            setShowMenu(!showMenu);
        }
    };

    const navLinks: NavLink[] = [
        {
            name: "About",
            href: "/about",
        },
        {
            name: "Discover",
            href: "/discover",
        },
        {
            name: "Sign In",
            href: `${pathname}?showDialog=y`, // open login modal
        },
    ];

    return (
        <>
            {showMenu ? (
                <Image
                    src="./x.svg"
                    width={24}
                    height={24}
                    alt="X"
                    className="md:hidden z-20 flex-shrink-0 cursor-pointer"
                    onClick={() => setShowMenu(!showMenu)}
                />
            ) : (
                <Image
                    src="./burger-menu.svg"
                    width={24}
                    height={24}
                    alt="Burger Menu"
                    className="md:hidden flex-shrink-0 cursor-pointer"
                    onClick={() => setShowMenu(!showMenu)}
                />
            )}
            <div
                className={`${showMenu ? "flex" : "hidden"} 
                    md:flex absolute inset-0 z-10 flex-col justify-center items-center gap-3 bg-white
            md:static md:flex-row md:justify-between md:items-center h-12`}
            >
                {navLinks.map((navLink, index) => (
                    <div
                        className={`${navLink.name==="Sign In"&&props.user? "": "hover:bg-underline-stroke"} bg-no-repeat bg-bottom py-2 bg-clip-padding h-auto${
                            pathname === navLink.href
                                ? "bg-underline-stroke"
                                : "bg-none"
                        }`}
                        key={index}
                    >
                        <Link
                            href={navLink.href}
                            className="mx-5 text-2xl h-8 text-nowrap"
                            onClick={handleClick}
                        >
                            {navLink.name==="Sign In"&&props.user? <img className="rounded-full mx-5 text-2xl h-auto size-12"src={props.user.photoURL}/>:navLink.name}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
