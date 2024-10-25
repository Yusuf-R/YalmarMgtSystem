'use client';
import LeaveRequestConfirmation
    from "@/components/HelpDeskComponents/LeaveRequestConfirmation/LeaveRequestConfirmation";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import AdminUtilities from "@/utils/AdminUtilities";
import LostInSpace from "@/components/Errors/LostInSpace/LostInSpace";

function LeaveReqConfirmation() {
    const [decryptedReqID, setDecryptedReqID] = useState(null);
    const [decryptedReqData, setDecryptedReqData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const decryptData = async () => {
            try {
                const reqID = sessionStorage.getItem('reqID');
                const decryptedID = await AdminUtilities.decryptObjID(reqID);

                const reqData = sessionStorage.getItem('reqData');
                const decryptedData = await AdminUtilities.decryptData(reqData);

                setDecryptedReqID(decryptedID);
                setDecryptedReqData(decryptedData);
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
        return <p>Loading...</p>;
    }

    if (!decryptedReqID || !decryptedReqData) {
        return <LostInSpace/>; // Render LostInSpace if decryption failed
    }

    return (
        <>
            <LeaveRequestConfirmation reqID={decryptedReqID} reqData={decryptedReqData}/>
        </>
    )
}

export default LeaveReqConfirmation;