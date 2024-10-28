'use client'
import EditStaff from "@/components/StaffComponents/EditStaff/EditStaff";
import AdminUtils from "@/utils/AdminUtilities";
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import LostInSpace from "@/components/Errors/LostInSpace/LostInSpace";
import useStaffStore from "@/store/useStaffStore";
import LazyLoading from "@/components/LazyLoading/LazyLoading";

function EditProfile() {
    const [decryptedUserID, setDecryptedUserID] = useState(null);
    const [decryptedStaffData, setDecryptedStaffData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const router = useRouter();

    // Zustand store values
    const encryptedStaffData = useStaffStore((state) => state.encryptedStaffData);
    const encryptedStaffID = useStaffStore((state) => state.encryptedStaffID);


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
            <EditStaff id={decryptedUserID} staffData={decryptedStaffData}/>
        </>
    );
}

export default EditProfile;
