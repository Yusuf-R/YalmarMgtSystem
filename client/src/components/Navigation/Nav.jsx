// components/Nav.jsx

import Image from "next/image";
import navStyle from "./Nav.module.css";
import Link from "next/link";
import yalmar from "../../../images/YML.png";

function Nav() {
    return (
        <header className={navStyle.header}>
            <div className={navStyle.logoContainer}>
                <a href="/">
                    <Image
                        src= {yalmar}
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
                <div className={navStyle.navList}>
                    <Link href="/">
                        <p>Home</p>
                    </Link>
                    <Link href="/about">
                        <p>About</p>
                    </Link>
                    <Link href="/login">
                        <button>Login</button>
                    </Link>
                    <Link href="/register">
                        <button>SignUp</button>
                    </Link>
                </div>

            </nav>
        </header>
    );
}

export default Nav;
