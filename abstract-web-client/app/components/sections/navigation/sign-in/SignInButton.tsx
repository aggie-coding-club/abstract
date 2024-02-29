"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { signInWithGoogle, signOut } from "@/app/firebase/auth";

export default function SignIn() {
    const pathname = usePathname();
    const user = useAuth();

    return (
        <>
            {user ? (
                <div
                    className={`hover:bg-underline-stroke bg-no-repeat bg-bottom py-2 bg-clip-padding ${
                        pathname === "navLink.href"
                            ? "bg-underline-stroke"
                            : "bg-none"
                    }`}
                >
                    <button className="mx-5 text-2xl" onClick={signOut}>
                        Sign Out
                    </button>
                </div>
            ) : (
                <div
                    className={`hover:bg-underline-stroke bg-no-repeat bg-bottom py-2 bg-clip-padding ${
                        pathname === "navLink.href"
                            ? "bg-underline-stroke"
                            : "bg-none"
                    }`}
                >
                    <button
                        className="mx-5 text-2xl"
                        onClick={signInWithGoogle}
                    >
                        Sign In
                    </button>
                </div>
            )}
        </>
    );
}
