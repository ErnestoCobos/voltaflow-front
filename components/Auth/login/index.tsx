"use client";

import React, {useRef, useState} from "react";
import {motion} from "framer-motion";
import LoadingOverlay from "./LoadingOverlay";
import LoginForm from "./LoginForm";
import {IllustrationSection} from "./IllustrationSection";
import useMousePosition from "@/components/Auth/hooks/useMousePosition";
import useLogin from '@/components/Auth/hooks/useLogin';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Component representing the login page.
 *
 * This component handles the login process, including form submission,
 * displaying loading states, and showing error messages.
 *
 * @returns {JSX.Element} The rendered LoginPage component.
 */
export function LoginPage(): JSX.Element {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [eyesLookingUp, setEyesLookingUp] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPerformingLogin, setIsPerformingLogin] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const mousePosition = useMousePosition(containerRef);

    const {login, isLoading, error} = useLogin();

    /**
     * Handles the login form submission.
     *
     * @param e - The form submission event.
     */
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsPerformingLogin(true);
        const response = await login(email, password);

        if (response) {
            setIsAnimating(true);
            console.log('Login successful:', response);
        } else {
            setIsPerformingLogin(false); // Stop animation if login fails
            toast.error(error || 'Login failed');
            console.error('Login failed:', error);
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 flex items-center justify-center overflow-hidden">
            <motion.div
                className="w-full max-w-[1200px] bg-white rounded-2xl flex overflow-hidden shadow-2xl"
                animate={isAnimating ? {scale: 0.95} : {scale: 1}}
                transition={{duration: 0.4, ease: 'easeInOut'}}
            >
                <IllustrationSection
                    containerRef={containerRef}
                    mousePosition={mousePosition}
                    eyesLookingUp={eyesLookingUp}
                    isAnimating={isAnimating}
                />

                <LoginForm
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    setEyesLookingUp={setEyesLookingUp}
                    handleLogin={handleLogin}
                    isAnimating={isAnimating}
                    isPerformingLogin={isPerformingLogin}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    rememberMe={rememberMe}
                    setRememberMe={setRememberMe}
                    error={error}
                    isLoading={isLoading}
                />
            </motion.div>

            <LoadingOverlay isLoading={isLoading}/>
            <ToastContainer/>
        </div>
    );
}