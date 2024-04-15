"use client";
import { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/components/context/AuthContext";
import { signInWithGoogle, signOut } from "@/app/firebase/auth";
import Link from "next/link";

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
            className="fixed m-0 w-full max-w-full h-full max-h-full bg-black/50 backdrop-blur-sm outline-none font-sans"
        >
            <div
                className={`fixed ${
                    user ? "h-40" : "h-28"
                } w-56  md:w-60  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col bg-white dark:bg-slate-800 rounded-2xl`}
            >
                <div className="flex justify-end m-1 items-center">
                    <div className="rounded-full hover:bg-black/10 p-2">
                        <Image
                            src="./x.svg"
                            width={12}
                            height={12}
                            alt="X"
                            className="cursor-pointer flex-shrink-0 sm:w-4 sm:h-4 dark:invert"
                            onClick={handleDialog}
                        />
                    </div>
                </div>
                <div className="text-nowrap px-3">
                    {user && (
                        <div className="flex flex-col items-between my-1">
                            <p className="font-medium text-lg text-center dark:text-white">
                                Hi, {user?.displayName} 👋
                            </p>
                            <Link
                                className="flex justify-center items-center gap-2 border-[1px] border-black dark:border-white py-1 px-4 rounded-md font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black  hover:text-black dark:hover:text-white mt-2 outline-none"
                                href="/history"
                            >
                                History
                            </Link>
                        </div>
                    )}
                    <div className="flex justify-center items-center">
                        {user ? (
                            <button
                                className="flex justify-center items-center gap-2 border-[1px] border-black dark:border-white py-1 px-4 rounded-md font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black  hover:text-black dark:hover:text-white w-full outline-none"
                                onClick={() => {
                                    handleDialog();
                                    signOut();
                                }}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <button
                                className="flex justify-center items-center gap-2 border-[1px] border-black dark:border-white py-2 px-4 rounded-md font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black  hover:text-black dark:hover:text-whit outline-none"
                                onClick={() => {
                                    handleDialog();
                                    signInWithGoogle();
                                }}
                            >
                                <img src="./google.svg" />
                                <p>Sign in with Google</p>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </dialog>
    );
}
