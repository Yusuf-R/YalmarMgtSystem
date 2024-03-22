// hooks/useAuthGuard.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function useAuthGuard() {
    const router = useRouter();
    
    useEffect(() => {
        const email = Cookies.get('email');
        if (!email) {
            // Redirect to login page if email is not found in cookies
            router.push('/error/404');
        }
    }, []);
    
    return null; // This hook doesn't render anything, it just performs authentication check
}

export default useAuthGuard;
