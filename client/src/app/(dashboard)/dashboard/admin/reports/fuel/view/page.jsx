'use client';
import {lazy, Suspense, useEffect, useState} from 'react';
import LostInSpace from "@/components/Errors/LostInSpace/LostInSpace";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {useRouter} from "next/navigation";
import useFuelReportStore from "@/store/useFuelReportStore";
import AdminUtils from "@/utils/AdminUtilities";

const ViewFuelReport = lazy(() => import('@/components/ReportComponents/FuellingComponents/ViewFuelReport/ViewFuelReport'));

function ViewFuellingReport() {
    const [decryptedFuelID, setDecryptedFuelID] = useState(null);
    const [decryptedFuelData, setDecryptedFuelData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const router = useRouter();

    // Zustand store values (destructured in a single call)
    // Get the stored data
    const encryptedFuelData = useFuelReportStore(state => state.encryptedFuelData);
    const encryptedFuelID = useFuelReportStore(state => state.encryptedFuelID);
    // Decrypt the site data stored in Zustand
    useEffect(() => {
        const decryptData = async () => {
            try {
                if (encryptedFuelData && encryptedFuelID) {
                    const decryptedID = await AdminUtils.decryptObjID(encryptedFuelID); // Decrypt the site ID
                    const decryptedData = await AdminUtils.decryptData(encryptedFuelData); // Decrypt the site data

                    setDecryptedFuelID(decryptedID);
                    setDecryptedFuelData(decryptedData);
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
    }, [encryptedFuelData, encryptedFuelID]);

    // Redirect logic if no data found or decryption failed
    useEffect(() => {
        if (shouldRedirect) {
            router.push('/dashboard/admin/site/void'); // Redirect to void page for sites
        }
    }, [shouldRedirect, router]);

    if (isLoading) {
        return <LazyLoading/>;
    }

    if (!decryptedFuelID || !decryptedFuelData) {
        return <LostInSpace/>; // Render VoidSite if decryption failed
    }

    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <ViewFuelReport fuelData={decryptedFuelData} fuelID={decryptedFuelID}/>
            </Suspense>
        </>
    )
}

export default ViewFuellingReport;
