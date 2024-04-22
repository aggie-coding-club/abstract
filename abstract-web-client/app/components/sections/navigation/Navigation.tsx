"use client";
import React from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import { AuthProvider } from "../../context/AuthContext";
import NavLinks from "./NavLinks";

export default function Navigation() {
    return (
        <div className="fixed inset-0 top-0 left-0 z-10">
            <nav className="min-w-[320px] bg-transparent dark:bg-black flex justify-between items-center px-3 py-2 md:px-20 md:py-2">
                <Link
                    href="/"
                    className="bg-brush-stroke-1 dark:invert bg-no-repeat bg-contain bg-center w-36 h-7 md:w-64 md:h-14 flex justify-center items-center flex-shrink-0"
                >
                    <p className="text-white bg-none  md:text-3xl tracking-[0.15em] stroke-1">
                        abstract
                    </p>
                </Link>
                <AuthProvider>
                    <NavLinks />
                </AuthProvider>
            </nav>
            <AuthProvider>
                <LoginModal />
            </AuthProvider>
        </div>
    );
}
