'use client'
import ViewStaff from "@/components/StaffComponents/ViewStaff/ViewStaff";
import AdminUtils from "@/utils/AdminUtilities";
import {useEffect, useState, useRef} from 'react';
import {useRouter} from 'next/navigation';
import VoidStaff from "@/components/Errors/LostInSpace/LostInSpace";
import LazyLoading from "@/components/LazyLoading/LazyLoading";

function ViewProfile() {
    const [decryptedUserID, setDecryptedUserID] = useState(null);
    const [decryptedStaffData, setDecryptedStaffData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false); // New state to trigger redirection
    const router = useRouter();
    
    useEffect(() => {
        const decryptData = async () => {
            try {
                const staffID = sessionStorage.getItem('staffID');
                const decryptedID = await AdminUtils.decryptUserID(staffID);
                const staffData = sessionStorage.getItem('staffData');
                const decryptedData = await AdminUtils.decryptData(staffData);
                setDecryptedUserID(decryptedID);
                setDecryptedStaffData(decryptedData);
            } catch (error) {
                if (error instanceof DOMException && error.message === 'The provided data is too small') {
                    console.log(error.message);
                    setShouldRedirect(true); // Indicate that redirection should happen
                } else {
                    setShouldRedirect(true); // Indicate that redirection should happen for other errors
                }
            } finally {
                setIsLoading(false);
            }
        };
        decryptData();
    }, []);
    
    useEffect(() => {
        if (shouldRedirect) {
            router.push(shouldRedirect ? '/dashboard/admin/staff/void' : '/error/404'); // Perform redirection based on the state
            setShouldRedirect(false); // Reset the state to prevent continuous redirection
        }
    }, [shouldRedirect, router]); // Depend on shouldRedirect to trigger the effect
    
    if (isLoading) {
        return <LazyLoading/>;
    }
    if (!decryptedUserID || !decryptedStaffData) {
        return <VoidStaff/>; // Render LostInSpace if decryption failed
    }
    return (
        <>
            <ViewStaff id={decryptedUserID} staffData={decryptedStaffData}/>
        </>
    );
}

export default ViewProfile;
