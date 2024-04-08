import { AuthProvider } from "../components/context/AuthContext";
import Upload from "./upload";

export default function Discover() {
    return (
        <div className="flex flex-col text-center gap-4 px-20">
            <div className="dark:text-white">DISCOVER</div>
            <AuthProvider>
                <Upload />
            </AuthProvider>
        </div>
    );
}
