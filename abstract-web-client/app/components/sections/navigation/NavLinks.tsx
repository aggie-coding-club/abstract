"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginModal from "./sign-in/LoginModal";

export type NavLink = {
    name: string;
    href: string;
};

export type NavLinksProps = Readonly<{
    showMenu: boolean;
    setShowMenu: (showMenu: boolean) => void;
}>;

export default function NavLinks({ showMenu, setShowMenu }: NavLinksProps) {
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
        <div
            className={`${
                showMenu ? "flex" : "hidden"
            } sm:flex absolute inset-0 z-10 flex-col justify-center items-center gap-3 bg-white
            sm:static sm:flex-row sm:justify-between sm:items-center`}
        >
            {navLinks.map((navLink, index) => (
                <div
                    className={`hover:bg-underline-stroke bg-no-repeat bg-bottom py-2 bg-clip-padding ${
                        pathname === navLink.href
                            ? "bg-underline-stroke"
                            : "bg-none"
                    }`}
                    key={index}
                >
                    <Link
                        href={navLink.href}
                        className="mx-5 text-2xl text-nowrap"
                        onClick={handleClick}
                    >
                        {navLink.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}
