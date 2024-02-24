"use client";
import Link from "next/link";
import { NavLink } from "./Navigation";
import { usePathname } from "next/navigation";
import React from "react";
import { User } from "firebase/auth";
import SignIn from "./SignIn";

export type NavLinksProps = Readonly<{
    navLinks: NavLink[];
    user: User | null;
}>;

export default function NavLinks({ navLinks, user }: NavLinksProps) {
    const pathname = usePathname();

    return (
        <div className="flex justify-between items-center">
            {navLinks.map((navLink, index) => (
                <div
                    className={`hover:bg-underline-stroke bg-no-repeat bg-bottom py-2 bg-clip-padding ${
                        pathname === navLink.href
                            ? "bg-underline-stroke"
                            : "bg-none"
                    }`}
                    key={index}
                >
                    <Link href={navLink.href} className="mx-5 text-2xl">
                        {navLink.name}
                    </Link>
                </div>
            ))}
            <SignIn user={user} />
        </div>
    );
}
