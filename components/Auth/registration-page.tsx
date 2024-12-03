'use client'

import { useState, useEffect, useRef, FC} from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff } from 'lucide-react'

import { Button } from "@/components/Auth/ui/button"
import { Input } from "@/components/Auth/ui/input"

const floatAnimation = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
`

const RegistrationPage: FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [focusedInput, setFocusedInput] = useState<string | null>(null)
  const [eyesLookingUp, setEyesLookingUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (event.clientX - left) / width,
          y: (event.clientY - top) / height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const calculateEyePosition = (baseX: number, baseY: number) => {
    if (eyesLookingUp) {
      return { x: baseX, y: baseY - 3 }
    }
    const dx = mousePosition.x - 0.5
    const dy = mousePosition.y - 0.5
    const distance = Math.sqrt(dx * dx + dy * dy)
    const maxDistance = 0.18
    const scale = Math.min(distance / maxDistance, 1)
    const x = baseX + 3.6 * dx * scale
    const y = baseY + 3.6 * dy * scale
    return { x, y }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsSuccess(true)
  }

  return (
    <div className="min-h-screen bg-[#1B1B1B] p-6 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1200px] bg-white rounded-2xl flex overflow-hidden shadow-lg">
        <style jsx>{`
          ${floatAnimation}
          .shape {
            position: absolute;
            animation: float 4s infinite ease-in-out;
          }
          .shape:nth-child(1) { animation-delay: 0s; }
          .shape:nth-child(2) { animation-delay: 1s; }
          .shape:nth-child(3) { animation-delay: 2s; }
          .shape:nth-child(4) { animation-delay: 3s; }
        `}</style>

        {/* Left Section with Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-[#ffd4d4] to-[#ffe8e0] items-center justify-center p-12 relative overflow-hidden">
          {/* Geometric Shapes */}
          <div ref={containerRef} className="absolute inset-0">
            <motion.div
              className="shape absolute left-1/4 top-1/4 w-24 h-48 bg-[#8E44AD] rounded-lg"
              animate={{ y: isSuccess ? 0 : [0, -20, 0] }}
              transition={{ duration: 4, repeat: isSuccess ? 0 : Infinity, ease: "easeInOut" }}
            >
              <div className="flex gap-2 justify-center pt-4">
                <div className="w-7 h-7 bg-white rounded-full relative overflow-hidden">
                  <motion.div
                    className="w-3.5 h-3.5 bg-black rounded-full absolute"
                    animate={{
                      x: calculateEyePosition(3.5, 3.5).x,
                      y: calculateEyePosition(3.5, 3.5).y,
                    }}
                  />
                </div>
                <div className="w-7 h-7 bg-white rounded-full relative overflow-hidden">
                  <motion.div
                    className="w-3.5 h-3.5 bg-black rounded-full absolute"
                    animate={{
                      x: calculateEyePosition(3.5, 3.5).x,
                      y: calculateEyePosition(3.5, 3.5).y,
                    }}
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              className="shape absolute right-1/4 top-1/3 w-20 h-36 bg-black rounded-lg"
              animate={{ y: isSuccess ? 0 : [0, -20, 0] }}
              transition={{ duration: 4, repeat: isSuccess ? 0 : Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex gap-2 justify-center pt-4">
                <div className="w-7 h-7 bg-white rounded-full relative overflow-hidden">
                  <motion.div
                    className="w-3.5 h-3.5 bg-black rounded-full absolute"
                    animate={{
                      x: calculateEyePosition(3.5, 3.5).x,
                      y: calculateEyePosition(3.5, 3.5).y,
                    }}
                  />
                </div>
                <div className="w-7 h-7 bg-white rounded-full relative overflow-hidden">
                  <motion.div
                    className="w-3.5 h-3.5 bg-black rounded-full absolute"
                    animate={{
                      x: calculateEyePosition(3.5, 3.5).x,
                      y: calculateEyePosition(3.5, 3.5).y,
                    }}
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              className="shape absolute left-1/3 bottom-1/4 w-24 h-32 bg-[#F1C40F] rounded-full"
              animate={{ y: isSuccess ? 0 : [0, -20, 0] }}
              transition={{ duration: 4, repeat: isSuccess ? 0 : Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="flex justify-center items-center h-full">
                <div className="w-7 h-7 bg-white rounded-full relative overflow-hidden">
                  <motion.div
                    className="w-3.5 h-3.5 bg-black rounded-full absolute"
                    animate={{
                      x: calculateEyePosition(3.5, 3.5).x,
                      y: calculateEyePosition(3.5, 3.5).y,
                    }}
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              className="shape absolute right-1/3 bottom-1/3 w-32 h-16 bg-[#FFA726] rounded-t-full"
              animate={{ y: isSuccess ? 0 : [0, -20, 0] }}
              transition={{ duration: 4, repeat: isSuccess ? 0 : Infinity, ease: "easeInOut", delay: 3 }}
            >
              <div className="flex gap-4 justify-center pt-4">
                <div className="w-7 h-7 bg-white rounded-full relative overflow-hidden">
                  <motion.div
                    className="w-3.5 h-3.5 bg-black rounded-full absolute"
                    animate={{
                      x: calculateEyePosition(3.5, 3.5).x,
                      y: calculateEyePosition(3.5, 3.5).y,
                    }}
                  />
                </div>
                <div className="w-7 h-7 bg-white rounded-full relative overflow-hidden">
                  <motion.div
                    className="w-3.5 h-3.5 bg-black rounded-full absolute"
                    animate={{
                      x: calculateEyePosition(3.5, 3.5).x,
                      y: calculateEyePosition(3.5, 3.5).y,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
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
              <h1 className="text-2xl md:text-3xl font-bold text-black">Create an account</h1>
              <p className="text-sm text-[#7F8C8D]">Please enter your details to register</p>
            </div>

            {isSuccess ? (
              <div className="text-center space-y-4">
                <h2 className="text-xl font-bold text-green-600">Registration Successful!</h2>
                <p className="text-sm text-[#7F8C8D]">
                  Please check your email to confirm your registration. Don't forget to check your spam folder.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border-[#BDC3C7] focus:border-[#3498DB]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border-[#BDC3C7] focus:border-[#3498DB]"
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full border-[#BDC3C7] focus:border-[#3498DB]"
                      onFocus={() => {
                        setFocusedInput('password')
                        setEyesLookingUp(true)
                      }}
                      onBlur={() => {
                        setFocusedInput(null)
                        setEyesLookingUp(false)
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BDC3C7] hover:text-[#7F8C8D]"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white h-11">
                    {isLoading ? "Registering..." : "Sign Up"}
                  </Button>
                </div>
              </form>
            )}

            <div className="text-center text-sm text-[#7F8C8D]">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#3498DB] hover:underline">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage;