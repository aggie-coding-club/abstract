"use client";
import Link from "next/link";
import { NavLink } from "./Navigation";
import { usePathname } from "next/navigation";
import { UserAuth } from "../../../context/AuthContext";
import React, { useState, useEffect } from "react";
import { log } from "console";

export type NavLinksProps = Readonly<{
  navLinks: NavLink[];
}>;

export default function NavLinks({ navLinks }: NavLinksProps) {
  const { user, googleSignIn, logOut } = UserAuth();

  const pathname = usePathname();

  const [loggedin, setLoggedin] = useState(false);

  const login = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(user);
    if (user != null) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  }, [user]);

  const signOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  //if logged in, show the first div, else show the second div
  return loggedin ? (
    <div className="flex justify-between items-center">
      {navLinks.map((navLink, index) => (
        <div
          className={`hover:bg-underline-stroke bg-no-repeat bg-bottom py-2 bg-clip-padding ${
            pathname === navLink.href ? "bg-underline-stroke" : "bg-none"
          }`}
          key={index}
        >
          <Link href={navLink.href} className="mx-5 text-2xl">
            {navLink.name}
          </Link>
        </div>
      ))}
      <div
        className={`hover:bg-underline-stroke bg-no-repeat bg-bottom py-2 bg-clip-padding ${
          pathname === "navLink.href" ? "bg-underline-stroke" : "bg-none"
        }`}
      >
        <Link href={"#"} className="mx-5 text-2xl" onClick={signOut}>
          Sign Out
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex justify-between items-center">
      {navLinks.map((navLink, index) => (
        <div
          className={`hover:bg-underline-stroke bg-no-repeat bg-bottom py-2 bg-clip-padding ${
            pathname === navLink.href ? "bg-underline-stroke" : "bg-none"
          }`}
          key={index}
        >
          <Link href={navLink.href} className="mx-5 text-2xl">
            {navLink.name}
          </Link>
        </div>
      ))}
      <div
        className={`hover:bg-underline-stroke bg-no-repeat bg-bottom py-2 bg-clip-padding ${
          pathname === "navLink.href" ? "bg-underline-stroke" : "bg-none"
        }`}
      >
        <Link href={"#"} className="mx-5 text-2xl" onClick={login}>
          Login
        </Link>
      </div>
    </div>
  );
}
