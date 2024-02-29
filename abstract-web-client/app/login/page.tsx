"use client";
import { AuthProvider } from "../components/context/AuthContext";
import SignIn from "../components/sections/navigation/sign-in/SignInButton";

export default function Login() {
    return (
        <div className="flex justify-center items-center">
            <AuthProvider>
                <SignIn />
            </AuthProvider>
        </div>
    );
}
