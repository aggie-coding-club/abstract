"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export type NavLink = {
    name: string;
    href: string;
};

export default function NavLinks() {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const pathname = usePathname();
    const handleClick = () => {
        // Only toggle the menu if the screen size is smaller than md
        if (window.innerWidth < 768) {
            setShowMenu(!showMenu);
        }
    };

    const user = useAuth();
    console.log(user);

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
                    className="md:hidden z-20 flex-shrink-0 cursor-pointer dark:invert"
                    onClick={() => setShowMenu(!showMenu)}
                />
            ) : (
                <Image
                    src="./burger-menu.svg"
                    width={24}
                    height={24}
                    alt="Burger Menu"
                    className="md:hidden flex-shrink-0 cursor-pointer dark:invert"
                    onClick={() => setShowMenu(!showMenu)}
                />
            )}
            <div
                className={`${showMenu ? "flex" : "hidden"} 
                    md:flex absolute inset-0 z-10 flex-col justify-center items-center gap-3 md:gap-8 bg-white dark:bg-black
            md:static md:flex-row md:justify-between md:items-center`}
            >
                {navLinks.map((navLink, index) => (
                    <div
                        className={`${
                            navLink.name === "Sign In" && user
                                ? ""
                                : "hover:bg-underline-stroke dark:invert"
                        } bg-no-repeat bg-bottom py-2 bg-clip-padding ${
                            pathname === navLink.href
                                ? "bg-underline-stroke"
                                : "bg-none"
                        }`}
                        key={index}
                    >
                        <Link
                            href={navLink.href}
                            className="text-2xl h-8 text-nowrap"
                            onClick={handleClick}
                        >
                            {navLink.name === "Sign In" &&
                            user &&
                            user.photoURL ? (
                                <img
                                    className="rounded-full size-12"
                                    src={user.photoURL}
                                    alt="Profile Picture"
                                    decoding="async"
                                />
                            ) : (
                                navLink.name
                            )}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
