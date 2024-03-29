"use client";
import { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/app/components/context/AuthContext";
import { signInWithGoogle, signOut } from "@/app/firebase/auth";

export default function LoginModal() {
    const searchParams = useSearchParams();
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const showDialog = searchParams.get("showDialog");
    const router = useRouter();
    const pathname = usePathname();
    const user = useAuth();
    useEffect(() => {
        if (showDialog === "y") {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [showDialog]);

    const handleDialog = () => {
        if (dialogRef.current?.open) {
            router.replace(`${pathname.split("?")[0]}`, undefined);
        } else {
            dialogRef.current?.showModal();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className="fixed m-0 w-full max-w-full h-full max-h-full bg-black/50 backdrop-blur-sm outline-none" // make this the backdrop (make it cover the screen)
        >
            <div className="fixed w-56 h-32 sm:w-60 sm:h-36 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col bg-white rounded-2xl">
                <div className="flex justify-end m-2 items-center">
                    <Image
                        src="./x.svg"
                        width={12}
                        height={12}
                        alt="X"
                        className="cursor-pointer flex-shrink-0 sm:w-4 sm:h-4"
                        onClick={handleDialog}
                    />
                </div>
                <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] gap-1 justify-center items-center flex-grow text-nowrap">
                    {user && <p>Hi, {user?.displayName}</p>}
                    <>
                        {user ? (
                            <div
                                className={`hover:bg-underline-stroke bg-no-repeat bg-bottom py-2 bg-clip-padding ${
                                    pathname === "navLink.href"
                                        ? "bg-underline-stroke"
                                        : "bg-none"
                                }`}
                            >
                                <button
                                    className="mx-5 text-2xl"
                                    onClick={() => {
                                        handleDialog();
                                        signOut();
                                    }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div //hover:bg-underline-stroke
                                className={`h-20 content-center bg-no-repeat bg-bottom py-2 bg-clip-padding ${
                                    pathname === "navLink.href"
                                        ? "bg-underline-stroke"
                                        : "bg-none"
                                }`}
                            >
                                <button
                                    className="mx-5 h-auto size-40"
                                    onClick={() => {
                                        handleDialog();
                                        signInWithGoogle();
                                    }}
                                >
                                    <img src="./sign-in-button.svg"/>
                                </button>
                            </div>
                        )}
                    </>
                </div>
            </div>
        </dialog>
    );
}
