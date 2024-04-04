"use client";
import React from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import { AuthProvider } from "../../context/AuthContext";
import NavLinks from "./NavLinks";

export default function Navigation() {
    return (
        <>
            <nav className="min-w-[320px] bg-transparent flex justify-between items-center px-3 py-2 md:px-20 md:py-2">
                <Link
                    href="/"
                    className="bg-brush-stroke-1 bg-no-repeat bg-contain bg-center w-36 h-7 md:w-64 md:h-14 flex justify-center items-center flex-shrink-0"
                >
                    <p className="text-white bg-none md:text-3xl tracking-[0.15em] stroke-1">
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
        </>
    );
}
