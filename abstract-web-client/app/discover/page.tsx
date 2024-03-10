import { AuthProvider } from "../components/context/AuthContext";
import Upload from "./upload/upload";

export default function Discover() {
    return (
        <div className="flex flex-col items-center gap-4">
            DISCOVER
            <AuthProvider>
                <Upload />
            </AuthProvider>
        </div>
    );
}
