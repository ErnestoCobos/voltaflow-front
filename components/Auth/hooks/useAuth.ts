/**
 * Custom hook to handle user Login process.
 *
 * This hook manages the authentication process by first obtaining a CSRF cookie
 * and then making a Login request with the provided email and password.
 *
 * @returns {Object} - An object containing the Login function, loading state, and error state.
 */
import {useState} from 'react';

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

/**
 * Custom hook to handle user Login process.
 *
 * @returns {Object} - An object containing the Login function, loading state, and error state.
 */
const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Function to perform user Login.
     *
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<LoginResponse | null>} - The Login response or null if an error occurred.
     */
    const login = async (email: string, password: string): Promise<LoginResponse | null> => {
        setIsLoading(false);
        setError(null);

        try {
            // Obtain the CSRF cookie
            await fetch('https://api.voltaflow.com/sanctum/csrf-cookie', {
                method: 'GET',
                credentials: 'include',
            });

            // Perform the Login request
            const response = await fetch('https://api.voltaflow.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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

    /**
     * Function to perform user registration.
     *
     * @param {string} name - The user's full name.
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @param {string} password_confirmation - The confirmation of the user's password.
     * @returns {Promise<RegistrationResponse | null>} - The registration response or null if an error occurred.
     */
    const register = async (name: string, email: string, password: string, password_confirmation: string): Promise<RegistrationResponse | null> => {
        setIsLoading(true);
        setError(null);

        try {
            // Obtain the CSRF cookie first
            await fetch('https://api.voltaflow.com/sanctum/csrf-cookie', {
                method: 'GET',
                credentials: 'include',
            });

            const response = await fetch('https://api.voltaflow.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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