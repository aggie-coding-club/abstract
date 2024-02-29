import { useState } from "react";
import Image from "next/image";
import NavLinks from "./NavLinks";

export default function Menu() {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <>
            {showMenu ? (
                <Image
                    src="./x.svg"
                    width={25}
                    height={25}
                    alt="X"
                    className="sm:hidden z-20 flex-shrink-0"
                    onClick={() => setShowMenu(!showMenu)}
                />
            ) : (
                <Image
                    src="./burger-menu.svg"
                    width={40}
                    height={40}
                    alt="Burger Menu"
                    className="sm:hidden flex-shrink-0"
                    onClick={() => setShowMenu(!showMenu)}
                />
            )}
            <NavLinks showMenu={showMenu} setShowMenu={setShowMenu} />
        </>
    );
}
