"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "firebase/auth";
import { onAuthStateChangedHelper } from "@/app/firebase/auth";
import LoginModal from "./sign-in/LoginModal";
import { AuthProvider } from "../../context/AuthContext";
import NavLinks from "./NavLinks";

export default function Navigation() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [user]);

    return (
        <>
            <nav className="bg-transparent flex justify-between items-center px-3 py-2 md:px-20 md:py-2">
                <Link
                    href="/"
                    className="bg-brush-stroke-1 bg-no-repeat bg-contain bg-center w-36 h-7 md:w-64 md:h-14 flex justify-center items-center flex-shrink-0"
                >
                    <p className="text-white bg-none md:text-3xl tracking-[0.15em] stroke-1">
                        abstract
                    </p>
                </Link>
                <NavLinks user={user} />
            </nav>
            <AuthProvider>
                <LoginModal />
            </AuthProvider>
        </>
    );
}
