"use client";

import { User } from "firebase/auth";
import { usePathname } from "next/navigation";
import { signInWithGoogle, signOut } from "../../../firebase/firebase";

interface SignInProps {
    user: User | null;
}

export default function SignIn({ user }: SignInProps) {
    const pathname = usePathname();

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
