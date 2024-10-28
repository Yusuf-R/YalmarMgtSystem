'use client';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState, Suspense, lazy} from "react";
import useBioDataStore from "@/store/useBioDataStore";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";

const NewLeaveRequest = lazy(() => import ("@/components/SettingsComponents/LeaveRequest/NewLeaveRequest/NewLeaveRequest"))

function NewLeaveRequestForm() {
    const queryClient = useQueryClient();
    const [staffData, setStaffData] = useState(null);
    const [processed, setProcessed] = useState(false); // Prevents re-processing

    // Get Zustand store functions and data
    const {
        encryptedStaffData,
        encryptedStaffID,
        setEncryptedStaffData
    } = useBioDataStore(state => ({
        encryptedStaffData: state.encryptedStaffData,
        encryptedStaffID: state.encryptedStaffID,
        setEncryptedStaffData: state.setEncryptedStaffData
    }));

    // Get cached data from TanStack Query
    const cachedData = queryClient.getQueryData(['BioData']);

    // Query setup
    const {data, isLoading, isError} = useQuery({
        queryKey: ['BioData'],
        queryFn: AdminUtils.Profile,
        staleTime: Infinity,
        enabled: !encryptedStaffData && !cachedData?.staffData,
    });

    useEffect(() => {
        const processData = async () => {
            try {
                if (processed) {
                    return;
                } // Prevent re-execution

                // Check Zustand first
                if (encryptedStaffData && encryptedStaffID) {
                    const decryptedData = await AdminUtils.decryptData(encryptedStaffData);
                    setStaffData(decryptedData);
                    setProcessed(true);
                    return;
                }

                // Check TanStack Query cache
                if (cachedData?.staffData) {
                    // Encrypt and store in Zustand
                    const encryptedID = await AdminUtils.encryptObjID(cachedData.staffData._id);
                    const encryptedData = await AdminUtils.encryptData(cachedData.staffData);
                    setEncryptedStaffData(encryptedData, encryptedID);
                    setStaffData(cachedData.staffData);
                    setProcessed(true);
                    return;
                }

                // If we have fresh data from the query
                if (data?.staffData) {
                    // Encrypt and store in Zustand
                    const encryptedID = await AdminUtils.encryptObjID(data.staffData._id);
                    const encryptedData = await AdminUtils.encryptData(data.staffData);
                    setEncryptedStaffData(encryptedData, encryptedID);
                    setStaffData(data.staffData);
                    setProcessed(true);
                }
            } catch (error) {
                console.error('Error processing data:', error);
            }
        };

        // Execute processData only once after component mounts
        if (!processed) {
            processData();
        }
    }, [encryptedStaffData, encryptedStaffID, cachedData, data, setEncryptedStaffData, processed]);

    if (isLoading || !staffData) {
        return <LazyLoading/>;
    }

    if (isError && !staffData) {
        console.error('Error fetching user data');
        return <DataFetchError/>;
    }

    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <NewLeaveRequest staffData={staffData}/>
            </Suspense>
        </>
    )

}

export default NewLeaveRequestForm;