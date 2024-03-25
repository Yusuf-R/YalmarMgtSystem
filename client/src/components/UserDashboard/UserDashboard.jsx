import styleUser from './UserDashboard.module.css';

function UserDashboard({ userData, accessToken, refreshToken }) {
    return (
        <>
            <div className={styleUser.userContainer}>
                <h2>User Dashboard</h2>
                <div>
                    Welcome User
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
                    <br/>
                    <br/>
                    <p>
                        Refresh-Token: {refreshToken}
                    </p>
                </div>
            </div>
        </>
    )
}

export default UserDashboard;