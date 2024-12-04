'use client';

import {useAuthCheck} from '@/components/Auth/hooks/useAuthCheck';

export default function DashboardClient() {
    useAuthCheck();

    return <h1>Dashboard</h1>;
}