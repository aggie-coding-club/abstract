import NavLinks from "./NavLinks";
import Link from "next/link";

export type NavLink = {
    name: string;
    href: string;
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
        name: "Login",
        href: "#",
    },
];

export default function Navigation() {
    return (
        <nav className="bg-transparent flex justify-between items-center px-20 py-2">
            <Link
                href="/"
                className="bg-brush-stroke-1 bg-no-repeat bg-contain bg-center w-64 h-14 flex justify-center items-center flex-shrink-0"
            >
                <p className="text-white bg-none text-3xl tracking-[0.15em]">
                    abstract
                </p>
            </Link>
            <NavLinks navLinks={navLinks} />
        </nav>
    );
}