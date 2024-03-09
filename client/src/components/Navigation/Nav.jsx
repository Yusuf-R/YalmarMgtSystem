// components/Nav.jsx

import Image from "next/image";
import navStyle from "./Nav.module.css";

function Nav() {
    return (
        <header className={navStyle.header}>
            <div className={navStyle.logoContainer}>
                <a href="/">
                    <Image
                        src="/images/YML.png"
                        alt="YALMAR Ventures"
                        width={37}
                        height={37}
                    />
                </a>
                <p className={navStyle.companyName}>
                    YALMAR Ventures Limited
                </p>
            </div>
            <nav>
                <ul className={navStyle.navList}>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#login">Login</a>
                    </li>
                    <li>
                        <a href="#signup">SignUp</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Nav;
