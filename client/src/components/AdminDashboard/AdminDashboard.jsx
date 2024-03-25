import styleAdmin from './AdminDashboard.module.css';
function AdminDashboard({ userData, accessToken, refreshToken }) {
    return (
        <>
            <div className={styleAdmin.adminContainer}>
                <h2>Admin Dashboard</h2>
                <div>
                    Welcome Admin
                </div>
                <div>
                    {Object.entries(userData).map(([key, value]) => (
                        <p key={key}>
                            {key}: {value}
                        </p>
                    ))}
                    <p>
                        Access-Token: {accessToken}
                    </p>
                    <p>
                        Refresh-Token: {refreshToken}
                    </p>
                </div>
            </div>
            
        </>
    )
}

export default AdminDashboard;