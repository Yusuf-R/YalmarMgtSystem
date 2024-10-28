'use client';
import {Suspense, lazy, useState, useEffect} from "react";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {useRouter} from "next/navigation";
import LostInSpace from "@/components/Errors/LostInSpace/LostInSpace";
import useStaffLeaveRequestStore from "@/store/useStaffLeaveRequestStore";

const ViewLeaveRequest = lazy(() => import("@/components/SettingsComponents/LeaveRequest/ViewLeaveRequest/ViewLeaveRequest"))

function ViewLeaveRequestPage() {
    const [decryptedReqId, setDecryptedReqId] = useState(null);
    const [decryptedReqData, setDecryptedReqData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const router = useRouter();

    // Zustand store values
    const encryptedStaffLeaveRequestData = useStaffLeaveRequestStore((state) => state.encryptedStaffLeaveRequestData);
    const encryptedStaffLeaveRequestId = useStaffLeaveRequestStore((state) => state.encryptedStaffLeaveRequestId);


    useEffect(() => {
        const decryptData = async () => {
            try {
                if (encryptedStaffLeaveRequestData && encryptedStaffLeaveRequestId) {
                    const decryptedID = await AdminUtils.decryptObjID(encryptedStaffLeaveRequestId);
                    const decryptedData = await AdminUtils.decryptData(encryptedStaffLeaveRequestData);

                    setDecryptedReqId(decryptedID);  // Set decrypted ID
                    setDecryptedReqData(decryptedData);  // Set decrypted staff data
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
    }, [encryptedStaffLeaveRequestData, encryptedStaffLeaveRequestId]);

    // Redirect logic if no data found or decryption failed
    useEffect(() => {
        if (shouldRedirect) {
            router.push('/dashboard/admin/staff/void');
        }
    }, [shouldRedirect, router]);

    if (isLoading) {
        return <LazyLoading/>;
    }

    if (!decryptedReqId || !decryptedReqData) {
        return <LostInSpace/>;
    }
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <ViewLeaveRequest leaveReqData={decryptedReqData} id={decryptedReqId}/>
            </Suspense>
        </>
    );
}

export default ViewLeaveRequestPage;
;