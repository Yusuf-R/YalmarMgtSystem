'use client';
import ViewSite from "@/components/SiteComponents/ViewSite/ViewSite"; // ViewSite component
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import useSiteStore from "@/store/useSiteStore"; // Zustand store for site
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import LostInSpace from "@/components/Errors/LostInSpace/LostInSpace"; // A "void" page for sites with no data

function ViewSiteProfile() {
    const [decryptedSiteID, setDecryptedSiteID] = useState(null);
    const [decryptedSiteData, setDecryptedSiteData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const router = useRouter();

    // Zustand store values
    const encryptedSiteData = useSiteStore((state) => state.encryptedSiteData);
    const encryptedSiteID = useSiteStore((state) => state.encryptedSiteID);
    const clearSiteData = useSiteStore((state) => state.clearSiteData);

    // Decrypt the site data stored in Zustand
    useEffect(() => {
        const decryptData = async () => {
            try {
                if (encryptedSiteData && encryptedSiteID) {
                    const decryptedID = await AdminUtils.decryptUserID(encryptedSiteID); // Decrypt the site ID
                    const decryptedData = await AdminUtils.decryptData(encryptedSiteData); // Decrypt the site data

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
            router.push('/dashboard/admin/site/void'); // Redirect to void page for sites
        }
    }, [shouldRedirect, router]);

    if (isLoading) {
        return <LazyLoading/>;
    }

    if (!decryptedSiteID || !decryptedSiteData) {
        return <LostInSpace/>; // Render VoidSite if decryption failed
    }

    return (
        <>
            <ViewSite id={decryptedSiteID} siteData={decryptedSiteData}/> {/* Pass decrypted data to ViewSite */}
        </>
    );
}

export default ViewSiteProfile;
