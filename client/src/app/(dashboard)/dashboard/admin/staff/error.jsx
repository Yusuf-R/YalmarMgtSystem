'use client'
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

function Error({error}) {
    const router = useRouter();
    
    useEffect(() => {
        // Log the error to an external service or console
        console.error(error);
    }, [error]);
    
    return (
        <div>
            <h2>Oops Something went wrong.</h2>
            <p>We're sorry, but something went wrong on our end. Please try again later.</p>
            <button onClick={() => router.push('/dashboard/admin/staff/void')}>
                Go Back to Dashboard
            </button>
        </div>
    );
}

export default Error;