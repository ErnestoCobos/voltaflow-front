/**
 * Custom hook to handle user Login process.
 *
 * This hook manages the authentication process by first obtaining a CSRF cookie
 * and then making a Login request with the provided email and password.
 *
 * @returns {Object} - An object containing the Login function, loading state, and error state.
 */
import {useState} from 'react';
import api from '@/misc/axiosInstance';
import { AxiosError } from 'axios';

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
            // Obtener la cookie CSRF primero
            await api.get('/sanctum/csrf-cookie');

            // Realizar la solicitud de login
            const response = await api.post<LoginResponse>('/api/login', { email, password });
            
            setIsLoading(false);
            return response.data;
        } catch (err: unknown) {
            setIsLoading(false);
    
            if (err instanceof AxiosError && err.response?.data) {
                // Casteamos la data a LoginError si aún la usas
                const errorData = err.response.data as LoginError;
                setError(errorData.message);
            } else {
                setError('An unexpected error occurred');
            }
    
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
            // Obtener la cookie CSRF antes de registrar
            await api.get('/sanctum/csrf-cookie');

            const response = await api.post<RegistrationResponse>('/api/register', {
                name,
                email,
                password,
                password_confirmation,
            });

            setIsLoading(false);
            return response.data;
        } catch (err: unknown) {
            setIsLoading(false);
            if (err instanceof AxiosError && err.response?.data) {
                const errorData = err.response.data as RegistrationError;
                const errorMessage = errorData.errors
                    ? Object.values(errorData.errors).flat().join(', ')
                    : errorData.message || 'Registration failed';
                setError(errorMessage);
                console.error('Registration failed:', errorData);
            } else {
                setError('An unexpected error occurred');
                console.error('Error during registration:', err);
            }
    
            return null;
        }
    };

    return {login, register, isLoading, error};
};

export default useAuth;