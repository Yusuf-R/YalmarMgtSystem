// utils/logoutUtil.js

import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import AdminUtils from "@/utils/AdminUtilities";
import Cookies from "js-cookie";

export const useLogout = () => {
    const router = useRouter();
    const mutation = useMutation({
        mutationKey: ['Logout'],
        mutationFn: AdminUtils.StaffLogout,
    });
    
    const handleLogout = () => {
        mutation.mutate(null, {
            onSuccess: (response) => {
                if (response) {
                    toast.success('Logout successful');
                    // Clear cookies and other user data
                    Cookies.remove('accessToken');
                    Cookies.remove('staffData');
                    Cookies.remove('rememberMe');
                    // Redirect to login page
                    setTimeout(() => {
                        router.push('/login');
                    }, 500);
                } else {
                    toast.error('Logout failed');
                }
            },
            onError: (error) => {
                toast.error('Logout failed');
                router.push('/error/404');
            },
        });
    };
    
    return handleLogout;
};
