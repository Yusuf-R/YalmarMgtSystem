'use client';
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {Suspense, lazy} from "react";
import {useEffect, useState} from 'react';
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import AdminUtils from "@/utils/AdminUtilities";
import {useRouter} from 'next/navigation';
import useFuelReportStore from "@/store/useFuelReportStore";
import LostInSpace from "@/components/Errors/LostInSpace/LostInSpace";

const FuelAnalytics = lazy(() => import("@/components/ReportComponents/FuellingComponents/FuelAnalytics/FuelAnalytics"));

function FuelAnalyticsDashboard() {
    const [error, setError] = useState(null);
    const [decryptedFuelID, setDecryptedFuelID] = useState(null);
    const [decryptedFuelData, setDecryptedFuelData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const router = useRouter();

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
                <FuelAnalytics fuelData={decryptedFuelData} fuelID={decryptedFuelID}/>
            </Suspense>
        </>
    );
}

export default FuelAnalyticsDashboard;
