import { AuthProvider } from "../components/context/AuthContext";
import Upload from "./upload";

export default function Discover() {
    return (
        <div className="flex flex-col justify-center text-center gap-4 px-20 w-screen">
            <div className="dark:text-white">DISCOVER</div>
            <AuthProvider>
                <Upload />
            </AuthProvider>
        </div>
    );
}
