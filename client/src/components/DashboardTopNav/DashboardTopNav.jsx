import styleTopNav from './DashboardTopNav.module.css';
import Image from "next/image";


function DashboardTopNav() {
    return (
        <>
            <div className={styleTopNav.parent}>
                <div className={styleTopNav.LHS}>
                    <div>
                            <Image
                                src="/YMS.png"
                                alt="YALMAR Logo"
                                width={50}
                                height={50}
                            />
                        </div>
                    <div>
                        <h3>YALMAR <br/>Management System</h3>
                    </div>
                </div>
                <div className={styleTopNav.RHS}>
                    <div>
                        Moon/Sun
                    </div>
                    <div>
                        SettingsIcon
                    </div>
                    <div>
                        Logout
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardTopNav