import React from "react"
import Link from "next/link"
import Image from "next/image"
import base64Logo from "@/misc/base64Logo"
import {ForgetPasswordForm} from "./ForgetPasswordForm"

export function ForgetPassword() {
    return (
        <div className="min-h-screen bg-[#1B1B1B] p-6 flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-[1200px] bg-white rounded-2xl flex overflow-hidden shadow-lg">
                {/* Left Section with Illustration */}
                <div
                    className="hidden md:flex md:w-1/2 bg-gradient-to-b from-[#ffd4d4] to-[#ffe8e0] items-center justify-center p-12 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Static shapes instead of animated ones */}
                        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#8E44AD] rounded-lg"/>
                        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#F1C40F] rounded-full"/>
                        <div className="absolute bottom-1/4 left-1/3 w-24 h-12 bg-[#3498DB] rounded-lg"/>
                        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-[#E74C3C] rounded-full"/>
                    </div>
                    {/* Central icon */}
                    <div className="relative z-10 bg-white rounded-full p-8 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#3498DB]" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                    </div>
                </div>

                {/* Right Section with Form */}
                <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
                    <div className="w-full max-w-[400px] mx-auto space-y-6">
                        <div className="text-center space-y-2">
                            <div
                                className="relative h-14 w-48 mx-auto mb-8 transform hover:scale-105 transition-transform">
                                <Image
                                    src={base64Logo}
                                    alt="Voltaflow Logo"
                                    fill
                                    priority
                                    className="object-contain"
                                />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-black">Forgot Password</h1>
                            <p className="text-sm text-[#7F8C8D]">Enter your email to reset your password</p>
                        </div>

                        <ForgetPasswordForm/>
                        <div className="text-center text-sm text-[#7F8C8D]">
                            <Link href="/app/auth/login"
                                  className="text-[#3498DB] hover:underline inline-flex items-center">
                                <span className="mr-2">←</span>
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}