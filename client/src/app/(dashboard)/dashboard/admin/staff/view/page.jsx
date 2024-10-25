'use client';
import ViewStaff from "@/components/StaffComponents/ViewStaff/ViewStaff";
import AdminUtils from "@/utils/AdminUtilities";
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import LostInSpace from "@/components/Errors/LostInSpace/LostInSpace";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import useStaffStore from "@/store/useStaffStore"; // Import Zustand store

function ViewProfile() {
    const [decryptedUserID, setDecryptedUserID] = useState(null);
    const [decryptedStaffData, setDecryptedStaffData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const router = useRouter();

    // Zustand store values
    const encryptedStaffData = useStaffStore((state) => state.encryptedStaffData);
    const encryptedStaffID = useStaffStore((state) => state.encryptedStaffID);
    const clearStaffData = useStaffStore((state) => state.clearStaffData);

    useEffect(() => {
        const decryptData = async () => {
            try {
                if (encryptedStaffData && encryptedStaffID) {
                    const decryptedID = await AdminUtils.decryptObjID(encryptedStaffID);
                    const decryptedData = await AdminUtils.decryptData(encryptedStaffData);

                    setDecryptedUserID(decryptedID);  // Set decrypted ID
                    setDecryptedStaffData(decryptedData);  // Set decrypted staff data
                } else {
                    setShouldRedirect(true);  // Redirect if no encrypted data is found
                }
            } catch (error) {
                console.error('Error during decryption:', error);
                setShouldRedirect(true);
            } finally {
                setIsLoading(false);
            }
        };

        decryptData();  // Decrypt data on page load
    }, [encryptedStaffData, encryptedStaffID]);

    // Redirect logic if no data found or decryption failed
    useEffect(() => {
        if (shouldRedirect) {
            router.push('/dashboard/admin/staff/void');
        }
    }, [shouldRedirect, router]);

    if (isLoading) {
        return <LazyLoading/>;
    }

    if (!decryptedUserID || !decryptedStaffData) {
        return <LostInSpace/>;
    }

    return (
        <>
            <ViewStaff id={decryptedUserID} staffData={decryptedStaffData}/>
        </>
    );
}

export default ViewProfile;
