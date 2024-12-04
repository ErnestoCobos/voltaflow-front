// useAuthCheck.ts
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import ROUTES from '@/misc/ROUTES';

export const useAuthCheck = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('authToken');

                if (token) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.push(ROUTES.LOGIN);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthenticated(false);
                router.push(ROUTES.LOGIN);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    return {isAuthenticated, isLoading};
};