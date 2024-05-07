import heroStyle from './Hero.module.css';
import Link from "next/link"

function Hero() {
    return (
        <>
            <div className={heroStyle.heroContainer}>
                <section>
                    <div>
                        <h1>YALMAR Management System.</h1>
                        <p>The smart system for managing staff and client operations.</p>
                    </div>
                    <div>
                        <Link href={"/register"} className={heroStyle.nextLink}>
                            <div className={heroStyle.animateContainer}>
                                <button className={heroStyle.heroBtn}>
                                    Get Started
                                </button>
                            </div>
                        </Link>
                    </div>
                </section>
            </div>
        
        </>
    )
}

export default Hero