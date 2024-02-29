"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "firebase/auth";
import { onAuthStateChangedHelper } from "@/app/firebase/auth";
import dynamic from "next/dynamic";
import LoginModal from "./sign-in/LoginModal";
import { AuthProvider } from "../../context/AuthContext";

const Menu = dynamic(() => import("./BurgerMenu"), { ssr: true });

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
            <nav className="bg-transparent flex justify-between items-center px-3 py-2 sm:px-20 sm:py-2">
                <Link
                    href="/"
                    className="bg-brush-stroke-1 bg-no-repeat bg-contain bg-center w-36 h-7 sm:w-64 sm:h-14 flex justify-center items-center flex-shrink-0"
                >
                    <p className="text-white bg-none sm:text-3xl tracking-[0.15em] stroke-1">
                        abstract
                    </p>
                </Link>
                <Menu />
            </nav>
            {/* Login Modal */}
            <AuthProvider>
                <LoginModal />
            </AuthProvider>
        </>
    );
}
