'use client'

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Loader2, ArrowLeft } from 'lucide-react'

import { Button } from "@/components/Auth/ui/button"
import { Input } from "@/components/Auth/ui/input"

export function ForgetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ isSubmitted: boolean; message: string }>({
    isSubmitted: false,
    message: '',
  });
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setSubmitStatus({
      isSubmitted: true,
      message: 'An email with instructions to reset your password has been sent. Please check your inbox and spam folder.',
    });
  }

  return (
    <div className="min-h-screen bg-[#1B1B1B] p-6 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1200px] bg-white rounded-2xl flex overflow-hidden shadow-lg">
        {/* Left Section with Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-[#ffd4d4] to-[#ffe8e0] items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {/* Animated shapes */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-16 h-16 bg-[#8E44AD] rounded-lg"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#F1C40F] rounded-full"
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 left-1/3 w-24 h-12 bg-[#3498DB] rounded-lg"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/3 right-1/3 w-16 h-16 bg-[#E74C3C] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Central icon */}
          <motion.div
            className="relative z-10 bg-white rounded-full p-8 shadow-lg"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#3498DB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </motion.div>
        </div>

        {/* Right Section with Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="w-full max-w-[400px] mx-auto space-y-6">
            <div className="text-center space-y-2">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Voltaflow%20Isologotipo-J5rlITjDdVDQXdUQ9OjqU2TCbWmYYR.png"
                alt="Voltaflow Logo"
                className="h-12 mx-auto mb-6"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-black">Forgot Password</h1>
              <p className="text-sm text-[#7F8C8D]">Enter your email to reset your password</p>
            </div>

            {submitStatus.isSubmitted ? (
              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-green-600 font-semibold">Email Sent!</p>
                <p className="text-sm text-[#7F8C8D]">
                  {submitStatus.message}
                </p>
                <Button 
                  onClick={() => setSubmitStatus({ isSubmitted: false, message: '' })} 
                  className="w-full bg-black hover:bg-gray-800 text-white h-11"
                >
                  Back to Reset Password
                </Button>
              </motion.div>
            ) : (
              <motion.form 
                onSubmit={handleSubmit} 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border-[#BDC3C7] focus:border-[#3498DB]"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white h-11">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </Button>
                </div>
              </motion.form>
            )}

            <div className="text-center text-sm text-[#7F8C8D]">
              <Link href="/auth/login" className="text-[#3498DB] hover:underline inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}