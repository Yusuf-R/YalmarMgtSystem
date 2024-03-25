import DashboardTopNav from "@/components/DashboardTopNav/DashboardTopNav";

function DashboardLayout({ children }) {
    return (
        <>
            <DashboardTopNav />
            {children}
        </>
    );
}

export default DashboardLayout;