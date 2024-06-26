import Image from 'next/image'
import footerStyle from './Footer.module.css'

function Footer() {
    return (
        <>
            <footer className={footerStyle.footerContainer}>
                {/* Address Section */}
                <div>
                    <div>
                        <p>Contact Us:</p>
                    </div>
                    <br/>
                    <div className={footerStyle.location}>
                        <div>
                            <Image
                                src="https://img.icons8.com/color/24/marker--v1.png"
                                width="24"
                                height="24"
                                alt="Address"
                            />
                        </div>
                        <div>
                            <p> Trikania New Extension,<br/> Agwa Layout, <br/> Kaduna.</p>
                        </div>
                    </div>
                    <br/>
                    <div className={footerStyle.location}>
                        <div>
                            <Image
                                src="https://img.icons8.com/color-glass/25/phone-disconnected.png"
                                width="25"
                                height="25"
                                alt="phone"
                            />
                        </div>
                        <div>
                            <p> 080-123-456-789</p>
                        </div>
                    </div>
                    <br/>
                    <div className={footerStyle.location}>
                        <div>
                            <Image
                                src="https://img.icons8.com/fluency/48/mail--v1.png"
                                width="24"
                                height="24"
                                alt="mail"
                            />
                        </div>
                        <div>
                            <p>support@mail.yalmarsystem.com</p>
                        </div>
                    </div>
                </div>
                {/* Social Section */}
                <div className={footerStyle.socials}>
                    <br/>
                    <div>
                        <p>Socials</p>
                    </div>
                    <div>
                        <ul className={`${footerStyle.uList} ${footerStyle.socialsIcons}`}>
                            <li>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                                         viewBox="0 0 48 48">
                                        <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993"
                                                        x2="40.615"
                                                        y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stopColor="#2aa4f4"></stop>
                                            <stop offset="1" stopColor="#007ad9"></stop>
                                        </linearGradient>
                                        <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                                              d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z">
                                        </path>
                                        <path fill="#fff"
                                              d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z">
                                        </path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                                         viewBox="0 0 48 48">
                                        <linearGradient id="_osn9zIN2f6RhTsY8WhY4a_5MQ0gPAYYx7a_gr1" x1="10.341"
                                                        x2="40.798"
                                                        y1="8.312" y2="38.769" gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stopColor="#2aa4f4"></stop>
                                            <stop offset="1" stopColor="#007ad9"></stop>
                                        </linearGradient>
                                        <path fill="url(#_osn9zIN2f6RhTsY8WhY4a_5MQ0gPAYYx7a_gr1)"
                                              d="M46.105,11.02c-1.551,0.687-3.219,1.145-4.979,1.362c1.789-1.062,3.166-2.756,3.812-4.758	c-1.674,0.981-3.529,1.702-5.502,2.082C37.86,8.036,35.612,7,33.122,7c-4.783,0-8.661,3.843-8.661,8.582	c0,0.671,0.079,1.324,0.226,1.958c-7.196-0.361-13.579-3.782-17.849-8.974c-0.75,1.269-1.172,2.754-1.172,4.322	c0,2.979,1.525,5.602,3.851,7.147c-1.42-0.043-2.756-0.438-3.926-1.072c0,0.026,0,0.064,0,0.101c0,4.163,2.986,7.63,6.944,8.419	c-0.723,0.198-1.488,0.308-2.276,0.308c-0.559,0-1.104-0.063-1.632-0.158c1.102,3.402,4.299,5.889,8.087,5.963	c-2.964,2.298-6.697,3.674-10.756,3.674c-0.701,0-1.387-0.04-2.065-0.122C7.73,39.577,12.283,41,17.171,41	c15.927,0,24.641-13.079,24.641-24.426c0-0.372-0.012-0.742-0.029-1.108C43.483,14.265,44.948,12.751,46.105,11.02"></path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25"
                                         viewBox="0 0 48 48">
                                        <radialGradient id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1" cx="19.38"
                                                        cy="42.035"
                                                        r="44.899" gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stopColor="#fd5"></stop>
                                            <stop offset=".328" stopColor="#ff543f"></stop>
                                            <stop offset=".348" stopColor="#fc5245"></stop>
                                            <stop offset=".504" stopColor="#e64771"></stop>
                                            <stop offset=".643" stopColor="#d53e91"></stop>
                                            <stop offset=".761" stopColor="#cc39a4"></stop>
                                            <stop offset=".841" stopColor="#c837ab"></stop>
                                        </radialGradient>
                                        <path fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                                              d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path>
                                        <radialGradient id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2" cx="11.786"
                                                        cy="5.54"
                                                        r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                                                        gradientUnits="userSpaceOnUse">
                                            <stop offset="0" stopColor="#4168c9"></stop>
                                            <stop offset=".999" stopColor="#4168c9" stopOpacity="0"></stop>
                                        </radialGradient>
                                        <path fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                                              d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path>
                                        <path fill="#fff"
                                              d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path>
                                        <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                                        <path fill="#fff"
                                              d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* Terms of Condition Sections */}
                <div className={footerStyle.termsConditions}>
                    <br/>
                    <div>
                        <p>Terms of Services</p>
                    </div>
                    <br/>
                    <div>
                        <ul className={`${footerStyle.uList} ${footerStyle.terms}`}>
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer