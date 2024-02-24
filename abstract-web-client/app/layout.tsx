"use client"; // Because useEffect only works on the client side

import type { Metadata } from "next";
import { Finger_Paint } from "next/font/google";
import "./globals.css";
import Navigation from "./components/sections/navigation/Navigation";
import { AuthContextProvider } from "./context/AuthContext";
const FingerPaint = Finger_Paint({ weight: "400", subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "abstract",
//   description:
//     "abstract is an image processing tool that converts an image into any form of art you can imagine!",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={FingerPaint.className}>
        <AuthContextProvider>
          <Navigation />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
//Navigation is passed as a child to the AuthContextProvider
