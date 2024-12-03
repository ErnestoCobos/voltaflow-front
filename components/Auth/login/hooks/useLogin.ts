/**
 * Custom hook to handle user login process.
 *
 * This hook manages the authentication process by first obtaining a CSRF cookie
 * and then making a login request with the provided email and password.
 *
 * @returns {Object} - An object containing the login function, loading state, and error state.
 */
import { useState } from 'react';

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

/**
 * Custom hook to handle user login process.
 *
 * @returns {Object} - An object containing the login function, loading state, and error state.
 */
const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Function to perform user login.
     *
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @returns {Promise<LoginResponse | null>} - The login response or null if an error occurred.
     */
    const login = async (email: string, password: string): Promise<LoginResponse | null> => {
        setIsLoading(false);
        setError(null);

        try {
            // Obtain the CSRF cookie
            await fetch('https://api.voltaflow.dev/sanctum/csrf-cookie', {
                method: 'GET',
                credentials: 'include',
            });

            // Perform the login request
            const response = await fetch('https://api.voltaflow.dev/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
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

    return { login, isLoading, error };
};

export default useLogin;