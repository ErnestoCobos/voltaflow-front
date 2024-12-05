import {useState} from 'react';
import {API} from '@/misc/API';

interface LoginResponse {
    message: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

interface LoginError {
    message: string;
}

interface RegistrationResponse {
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        tenant_id: number;
        created_at: string;
        updated_at: string;
    };
}

interface RegistrationError {
    message: string;
    errors?: Record<string, string[]>;
}

const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCsrfToken = async () => {
        const response = await fetch(API + '/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include',
        });
        const csrfToken = response.headers.get('X-CSRF-TOKEN');
        return csrfToken;
    };

    const login = async (email: string, password: string): Promise<LoginResponse | null> => {
        setIsLoading(false);
        setError(null);

        try {
            const csrfToken = await getCsrfToken();

            const response = await fetch(API + '/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                credentials: 'include',
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                const data: LoginResponse = await response.json();
                setIsLoading(false);
                return data;
            } else {
                const errorData: LoginError = await response.json();
                setError(errorData.message);
                setIsLoading(false);
                return null;
            }
        } catch {
            setError('An unexpected error occurred');
            setIsLoading(false);
            return null;
        }
    };

    const register = async (name: string, email: string, password: string, password_confirmation: string): Promise<RegistrationResponse | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const csrfToken = await getCsrfToken();

            const response = await fetch(API + '/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                credentials: 'include',
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsLoading(false);
                return data as RegistrationResponse;
            } else {
                const errorData = data as RegistrationError;
                const errorMessage = errorData.errors
                    ? Object.values(errorData.errors).flat().join(', ')
                    : errorData.message || 'Registration failed';
                setError(errorMessage);
                console.error('Registration failed:', errorData);
                setIsLoading(false);
                return null;
            }
        } catch (error) {
            setError('An unexpected error occurred');
            console.error('Error during registration:', error);
            setIsLoading(false);
            return null;
        }
    };

    return {login, register, isLoading, error};
};

export default useAuth;