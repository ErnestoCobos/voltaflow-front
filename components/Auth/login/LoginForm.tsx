"use client";

import React, {ChangeEvent, FC} from "react";
import {motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {Eye, EyeOff} from "lucide-react";

import {Input} from "@/components/Auth/ui/input";
import {Checkbox} from "@/components/Auth/ui/checkbox";
import {Button} from "@/components/Auth/ui/button";
import LoadingAnimation from "@/components/LoadingAnimation";

interface LoginFormProps {
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    setEyesLookingUp: (lookingUp: boolean) => void;
    handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
    isAnimating: boolean;
    isPerformingLogin: boolean;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    rememberMe: boolean;
    setRememberMe: (remember: boolean) => void;
    error: string | null;
    isLoading: boolean;
}

const LoginForm: FC<LoginFormProps> = ({
                                           showPassword,
                                           setShowPassword,
                                           setEyesLookingUp,
                                           handleLogin,
                                           isAnimating,
                                           isPerformingLogin,
                                           email,
                                           setEmail,
                                           password,
                                           setPassword,
                                           rememberMe,
                                           setRememberMe,
                                           error,
                                           isLoading,
                                       }) => (
    <motion.div
        className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center"
        animate={isAnimating ? {x: "100%"} : {x: "0%"}}
        transition={{duration: 0.5}}
    >
        <div className="w-full max-w-[400px] mx-auto space-y-8 relative">
            <div className="text-center space-y-3">
                <div className="relative h-14 w-48 mx-auto mb-8 transform hover:scale-105 transition-transform">
                    <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Voltaflow%20Isologotipo-J5rlITjDdVDQXdUQ9OjqU2TCbWmYYR.png"
                        alt="Voltaflow Logo"
                        fill
                        priority
                        className="object-contain"
                    />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Welcome back!
                </h1>
                <p className="text-sm text-gray-500">Please enter your details</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 relative">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border-gray-300 focus:border-blue-500 transition-colors"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        onFocus={() => setEyesLookingUp(false)}
                        onBlur={() => setEyesLookingUp(false)}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="relative group">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full border-gray-300 focus:border-blue-500 transition-colors"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            onFocus={() => setEyesLookingUp(true)}
                            onBlur={() => setEyesLookingUp(false)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors group-hover:text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                    </div>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            className="border-gray-300"
                            checked={rememberMe}
                            onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                        />
                        <label htmlFor="remember" className="text-sm text-gray-500 select-none">
                            Remember me
                        </label>
                    </div>
                    <Link
                        href="/app/auth/forgot-password"
                        className="text-sm text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                    >
                        Forgot password?
                    </Link>
                </div>

                <div className="space-y-4">
                    <Button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white h-12 font-medium rounded-lg transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Log In"}
                    </Button>
                </div>

                {isPerformingLogin && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                        <LoadingAnimation/>
                    </div>
                )}
            </form>

            <div className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                    href="/app/auth/signup"
                    className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    </motion.div>
);

export default LoginForm;
export type {LoginFormProps};