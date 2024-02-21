import Link from "next/link";
import { NavLink } from "./Navigation";

export type NavLinksProps = Readonly<{
    navLinks: NavLink[];
}>;

export default function NavLinks({ navLinks }: NavLinksProps) {
    return (
        <div className="flex justify-between items-center">
            {navLinks.map((navLink, index) => (
                <div className="bg-none hover:bg-underline-stroke bg-no-repeat bg-bottom py-2 bg-clip-padding hover:transition-all">
                    <Link
                        href={navLink.href}
                        className="mx-5 text-2xl"
                        key={index}
                    >
                        {navLink.name}
                    </Link>
                </div>
            ))}
        </div>
    );
}
