'use client';
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {Suspense, lazy} from "react";
import {useEffect, useState} from 'react';
import DataFetchError from "@/components/Errors/DataFetchError/DataFetchError";
import AdminUtils from "@/utils/AdminUtilities";
import {useRouter} from 'next/navigation';

const FuelAnalytics = lazy(() => import("@/components/FuellingComponents/FuelAnalytics/FuelAnalytics"));

function FuelAnalyticsDashboard() {
    const [decryptedSiteData, setDecryptedSiteData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    
    useEffect(() => {
        const decryptData = async () => {
            try {
                const siteData = sessionStorage.getItem('siteData');
                if (!siteData) {
                    throw new Error('Site data not found in session storage.');
                }
                const decryptedData = await AdminUtils.decryptData(siteData);
                setDecryptedSiteData(decryptedData);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        
        decryptData();
    }, []);
    
    // Handle redirection or rendering based on error types
    useEffect(() => {
        if (error) {
            console.error('Error decrypting data:', error);
            // Handle different types of errors or conditions for redirection
            if (error instanceof DOMException && error.message === 'The provided data is too small') {
                setError(new Error('Data decryption error'));
            } else if (error.message === 'Site data not found in session storage.') {
                // Redirect to 404 page if no data found
                router.push('/error/404');
            }
        }
    }, [error, router]);
    
    if (isLoading) {
        return <LazyLoading/>;
    }
    
    if (error) {
        return <DataFetchError error={error}/>;
    }
    
    if (!decryptedSiteData) {
        return <DataFetchError fetchError="Decrypted data is null or undefined."/>;
    }
    
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <FuelAnalytics siteData={decryptedSiteData}/>
            </Suspense>
        </>
    );
}

export default FuelAnalyticsDashboard;
