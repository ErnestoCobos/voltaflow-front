// useAuthCheck.ts
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

export const useAuthCheck = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Replace this with your actual authentication check
                // For example, you might check for a token in localStorage
                const token = localStorage.getItem('authToken');

                if (token) {
                    // Optionally, verify the token with your backend
                    // const response = await fetch('/api/verify-token', { headers: { Authorization: `Bearer ${token}` } });
                    // const data = await response.json();
                    // setIsAuthenticated(data.isValid);

                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.push('/login');
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthenticated(false);
                router.push('/login');
            }
        };

        checkAuth();
    }, [router]);

    return {isAuthenticated};
};
