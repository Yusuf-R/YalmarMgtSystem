'use client';
import {lazy, Suspense, useEffect, useState, useMemo} from 'react';
import {useRouter} from "next/navigation";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import useFuelReportStore from "@/store/useFuelReportStore";
import AdminUtils from "@/utils/AdminUtilities";

// Components
import LostInSpace from "@/components/Errors/LostInSpace/LostInSpace";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";

const EditFuelReport = lazy(() => import('@/components/ReportComponents/FuellingComponents/EditFuelReport/EditFuelReport'));

function EditFuellingReport() {
    const router = useRouter();
    const queryClient = useQueryClient();
    // Get the stored data
    const encryptedFuelData = useFuelReportStore(state => state.encryptedFuelData);
    const encryptedFuelID = useFuelReportStore(state => state.encryptedFuelID);

    // Check for cached site data first
    const cachedSiteData = queryClient.getQueryData(['AllSite']);

    // State for decryption results
    const [decryptionState, setDecryptionState] = useState({
        fuelID: null,
        fuelData: null,
        error: null,
        isDecrypting: true
    });

    // Query for site data only if not in cache
    const {data: fetchedSiteData, isLoading: isSiteLoading, isError: isSiteError} = useQuery({
        queryKey: ['AllSite'],
        queryFn: AdminUtils.AllSite,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        enabled: !cachedSiteData, // Only run query if no cached data
    });

    // Handle decryption in a single effect
    useEffect(() => {
        let mounted = true;

        const decryptData = async () => {
            // If no encrypted data, redirect immediately
            if (!encryptedFuelData || !encryptedFuelID) {
                router.push('/dashboard/admin/site/void');
                return;
            }

            try {
                const [decryptedID, decryptedData] = await Promise.all([
                    AdminUtils.decryptObjID(encryptedFuelID),
                    AdminUtils.decryptData(encryptedFuelData)
                ]);

                if (mounted) {
                    setDecryptionState({
                        fuelID: decryptedID,
                        fuelData: decryptedData,
                        error: null,
                        isDecrypting: false
                    });
                }
            } catch (error) {
                console.error('Decryption error:', error);
                if (mounted) {
                    setDecryptionState(prev => ({
                        ...prev,
                        error,
                        isDecrypting: false
                    }));
                    router.push('/dashboard/admin/site/void');
                }
            }
        };

        decryptData();

        return () => {
            mounted = false;
        };
    }, [encryptedFuelData, encryptedFuelID, router]);

    // Use cached data if available, otherwise use fetched data
    const effectiveSiteData = useMemo(() => {
        const siteData = cachedSiteData || fetchedSiteData;
        if (!siteData) {
            return null;
        }
        return {allSite: siteData.allSite};
    }, [cachedSiteData, fetchedSiteData]);

    // Loading state - only if we're actually fetching data (no cache) or decrypting
    if ((isSiteLoading && !cachedSiteData) || decryptionState.isDecrypting) {
        return <LazyLoading/>;
    }

    // Error states
    if ((isSiteError && !cachedSiteData) || !effectiveSiteData) {
        return <DataFetchError/>;
    }

    if (decryptionState.error || !decryptionState.fuelID || !decryptionState.fuelData) {
        return <LostInSpace/>;
    }

    // Render main component
    return (
        <Suspense fallback={<LazyLoading/>}>
            <EditFuelReport
                allSite={effectiveSiteData.allSite}
                fuelData={decryptionState.fuelData}
                fuelID={decryptionState.fuelID}
            />
        </Suspense>
    );
}

export default EditFuellingReport;