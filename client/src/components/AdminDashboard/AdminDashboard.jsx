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
                    <p>
                        {Object.entries(userData).map(([key, value]) => (
                            <p key={key}>
                                {key}: {value}
                            </p>
                            
                        ))}
                    </p>
                    <p>
                        {accessToken}
                    </p>
                    <p>
                        {refreshToken}
                    </p>
                </div>
            </div>
            
        </>
    )
}

export default AdminDashboard;