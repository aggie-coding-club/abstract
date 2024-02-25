"use client";
import { onAuthStateChangedHelper } from "@/app/firebase/auth";
import { User } from "firebase/auth";
import { useContext, createContext, useState, useEffect } from "react";

type AuthContextType = User | null;
const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, [user]);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
