'use client';
import {useQuery, useQueryClient} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import {Suspense, lazy, useEffect, useState} from "react";
import useBioDataStore from "@/store/useBioDataStore";

const MyBioData = lazy(() => import ("@/components/SettingsComponents/BioData/MyBioData/MyBioData"));

function Biodata() {
    const queryClient = useQueryClient();
    const [staffData, setStaffData] = useState(null);

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
        // Only enable query if we don't have data in Zustand or cache
        enabled: !encryptedStaffData && !cachedData?.staffData,
    });

    useEffect(() => {
        const processData = async () => {
            try {
                // Check Zustand first
                if (encryptedStaffData && encryptedStaffID) {
                    const decryptedData = await AdminUtils.decryptData(encryptedStaffData);
                    setStaffData(decryptedData);
                    return;
                }

                // Check TanStack Query cache
                if (cachedData?.staffData) {
                    // Encrypt and store in Zustand
                    const encryptedID = await AdminUtils.encryptObjID(cachedData.staffData._id);
                    const encryptedData = await AdminUtils.encryptData(cachedData.staffData);
                    setEncryptedStaffData(encryptedData, encryptedID);
                    setStaffData(cachedData.staffData);
                    return;
                }

                // If we have fresh data from the query
                if (data?.staffData) {
                    // Encrypt and store in Zustand
                    const encryptedID = await AdminUtils.encryptObjID(data.staffData._id);
                    const encryptedData = await AdminUtils.encryptData(data.staffData);
                    setEncryptedStaffData(encryptedData, encryptedID);
                    setStaffData(data.staffData);
                }
            } catch (error) {
                console.error('Error processing data:', error);
                // You might want to handle this error appropriately
            }
        };

        processData();
    }, [encryptedStaffData, encryptedStaffID, cachedData, data, setEncryptedStaffData]);

    if (isLoading || !staffData) {
        return <LazyLoading/>;
    }

    if (isError && !staffData) {
        console.error('Error fetching user data');
        return <DataFetchError/>;
    }

    return (
        <Suspense fallback={<LazyLoading/>}>
            <MyBioData staffData={staffData}/>
        </Suspense>
    );
}


export default Biodata;