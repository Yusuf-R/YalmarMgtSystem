'use client';
import AllStaff from '@/components/StaffComponents/AllStaff/AllStaff';
import {useQuery} from '@tanstack/react-query'; // Ensure this import is correct
import AdminUtils from '@/utils/AdminUtilities';
import {useRouter} from "next/navigation";
import {Suspense} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import E404 from "@/components/Errors/E404/E404";
import StaffLandingPage from "@/components/StaffComponents/StaffLangingPage/StaffLandingPage";


function StaffManagement() {
    return (
        <>
            <StaffLandingPage/>
        </>
    );
}

export default StaffManagement;