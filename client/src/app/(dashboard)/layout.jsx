//  creating a layout for the dashboard

function DashboardLayout({ children }) {
    return (
        <>
            <html lang="en">
                <body>{children}</body>
            </html>
        </>
    );
}

export default DashboardLayout;