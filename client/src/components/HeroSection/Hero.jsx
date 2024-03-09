import heroStyle from './Hero.module.css';
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
                        <button className={heroStyle.heroBtn}>Get Started</button>
                    </div>
                </section>
            </div>
        
        </>
    )
}

export default Hero