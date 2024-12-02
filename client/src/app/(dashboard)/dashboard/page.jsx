'use client';

import {useRouter} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {useEffect} from 'react';

function Dashboard() {
    const router = useRouter();

    const {data, isLoading, isError} = useQuery({
        queryKey: ['BioData'],
        queryFn: AdminUtils.Profile,
        staleTime: Infinity,
    });
    useEffect(() => {
        if (isError || !data) {
            console.error('Error or no data received');
            router.push('/error/404');
            return;
        }
        const {staffData} = data;
        if (!staffData) {
            console.error('Staff data missing');
            router.push('/error/404');
            return;
        }
        if (staffData.role === 'Admin' || staffData.role === 'SuperAdmin') {
            router.push('/dashboard/admin');
        } else if (staffData.role === 'User') {
            router.push('/dashboard/user');
        } else {
            console.error('Unrecognized role');
            router.push('/error/404');
        }
    }, [data, isError, router]);

    if (isLoading) {
        return <LazyLoading/>;
    }

    // Render a fallback while useEffect handles redirection
    return <LazyLoading/>
}

export default Dashboard;
