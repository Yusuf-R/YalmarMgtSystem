import Link from "next/link";
import styleSideNav from'./DashboardSideNav.module.css';

function DashboardSideNav() {
    return (
        <>
            <div className="styleSideNav.sidebar">
                <ul>
                    <li>
                        <Link href="/dashboard">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/users">
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/sites">
                            Sites
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/messages">
                            Generators
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/help">
                            Fuelling
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/logout">
                            Incident Reports
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/logout">
                            Inventories
                        </Link>
                    </li>
                    
                    
                </ul>
            </div>
        </>
    )
}

export default DashboardSideNav;