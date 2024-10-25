'use client'
import EditSite from "@/components/SiteComponents/EditSite/EditSite"; // Adjust the import to point to EditSite component
import AdminUtils from "@/utils/AdminUtilities";
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import LostInSpace from "@/components/Errors/LostInSpace/LostInSpace";
import useSiteStore from "@/store/useSiteStore"; // Use the correct Zustand store for sites
import LazyLoading from "@/components/LazyLoading/LazyLoading";

function EditSiteProfile() {
    const [decryptedSiteID, setDecryptedSiteID] = useState(null);
    const [decryptedSiteData, setDecryptedSiteData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const router = useRouter();

    // Zustand store values for sites
    const encryptedSiteData = useSiteStore((state) => state.encryptedSiteData);
    const encryptedSiteID = useSiteStore((state) => state.encryptedSiteID);
    const clearSiteData = useSiteStore((state) => state.clearSiteData);

    useEffect(() => {
        const decryptData = async () => {
            try {
                if (encryptedSiteData && encryptedSiteID) {
                    const decryptedID = await AdminUtils.decryptObjID(encryptedSiteID);
                    const decryptedData = await AdminUtils.decryptData(encryptedSiteData);

                    setDecryptedSiteID(decryptedID);  // Set decrypted ID
                    setDecryptedSiteData(decryptedData);  // Set decrypted site data
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
    }, [encryptedSiteData, encryptedSiteID]);

    // Redirect logic if no data found or decryption failed
    useEffect(() => {
        if (shouldRedirect) {
            router.push('/dashboard/admin/site/void'); // Redirect to a 'void' page for sites
        }
    }, [shouldRedirect, router]);

    if (isLoading) {
        return <LazyLoading/>;
    }

    if (!decryptedSiteID || !decryptedSiteData) {
        return <LostInSpace/>;
    }

    return (
        <>
            <EditSite id={decryptedSiteID} siteData={decryptedSiteData}/>
        </>
    );
}

export default EditSiteProfile;
