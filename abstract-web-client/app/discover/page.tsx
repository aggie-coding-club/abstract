import { AuthProvider } from "../components/context/AuthContext";
import Upload from "./upload";

export default function Discover() {
    return (
        <div className="flex flex-col text-center gap-4 px-20">
            DISCOVER
            <AuthProvider>
                <Upload />
            </AuthProvider>
        </div>
    );
}
