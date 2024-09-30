'use client';

import {useRouter} from "next/navigation";
import {useEffect, useState} from 'react';
import AdminUtils from "@/utils/AdminUtilities";
import LazyLoading from "@/components/LazyLoading/LazyLoading";
import {Suspense, lazy} from "react";

const SetPassword = lazy(() => import('@/components/HomeComponents/SetPassword/SetPassword'));

function NewPassword() {
    const router = useRouter();
    const [decryptedEmail, setDecryptedEmail] = useState(null);

    useEffect(() => {
        const encryptedEmail = sessionStorage.getItem("email");

        if (!encryptedEmail) {
            router.push('/error/404'); // Redirect if no encrypted email
            return;
        }

        const decryptEmail = async () => {
            try {
                const decrypted = await AdminUtils.decryptData(encryptedEmail);
                if (!decrypted || decrypted instanceof Error) {
                    router.push('/error/404'); // Redirect if decryption fails
                } else {
                    setDecryptedEmail(decrypted); // Store the decrypted email
                }
            } catch (e) {
                console.error('Decryption error:', e);
                router.push('/error/404'); // Redirect in case of error
            }
        };
        decryptEmail(); // Call async function
    }, [router]);

    // Show loading state if email is still being decrypted
    if (!decryptedEmail) {
        return <LazyLoading/>
    }
    return (
        <>
            <Suspense fallback={<LazyLoading/>}>
                <SetPassword decryptedEmail={decryptedEmail}/>
            </Suspense>
        </>
    )
}

export default NewPassword;
