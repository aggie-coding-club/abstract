"use client";
import { AuthProvider } from "../components/context/AuthContext";
import SignIn from "./SignInButton";

export default function Login() {
    return (
        <div className="flex justify-center items-center">
            <AuthProvider>
                <SignIn />
            </AuthProvider>
        </div>
    );
}
