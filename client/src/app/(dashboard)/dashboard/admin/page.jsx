'use client';
import Cookies from 'js-cookie';
import {useRouter} from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard/AdminDashboard';
import UserDashboard from '@/components/UserDashboard/UserDashboard';

function Admin() {
    const userData = JSON.parse(Cookies.get('userData') || null)
    const accessToken = Cookies.get('accessToken') || null;
    const router = useRouter();
    if (!userData || !accessToken) {
        return router.push('/error/404')
    }
    return (
        <AdminDashboard
            userData={userData}
            accessToken={accessToken}
        />
    );
}


export default Admin