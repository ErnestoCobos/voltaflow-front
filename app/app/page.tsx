'use client';

import {useAuthCheck} from '@/components/Auth/hooks/useAuthCheck';
import LoadingOverlay from '@/components/Auth/Login/LoadingOverlay';

export default function DashboardClient() {
    const {isAuthenticated, isLoading} = useAuthCheck();

    if (isLoading) {
        return <LoadingOverlay isLoading={true}/>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <h1>Dashboard</h1>;
}