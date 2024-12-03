import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/Auth/ui/button"
import { Input } from "@/components/Auth/ui/input"
import { Checkbox } from "@/components/Auth/ui/checkbox"

const floatAnimation = `
@keyframes float {
  0% { transform: translateX(0px); }
  50% { transform: translateX(20px); }
  100% { transform: translateX(0px); }
}
`

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [, setFocusedInput] = useState<string | null>(null)
  const [eyesLookingUp, setEyesLookingUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnimating(true)
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setIsAnimating(false)
  }

  return (
    <div className="min-h-screen bg-[#1B1B1B] p-6 flex items-center justify-center overflow-hidden">
      <motion.div 
        className="w-full max-w-[1200px] bg-white rounded-2xl flex overflow-hidden shadow-lg"
        animate={isAnimating ? { scale: 0.9 } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <style jsx>{`
          ${floatAnimation}
          .cloud {
            position: absolute;
            background: white;
            border-radius: 999px;
            animation: float 20s infinite;
            z-index: 2;
            width: 80px;
            height: 50px;
          }
          .cloud:nth-child(1) { top: 10%; left: 10%; animation-duration: 23s; }
          .cloud:nth-child(2) { top: 20%; right: 15%; animation-duration: 26s; }
          .cloud:nth-child(3) { top: 35%; left: 25%; animation-duration: 22s; }
          .cloud:nth-child(4) { top: 15%; left: 60%; animation-duration: 28s; }
          .cloud:nth-child(5) { top: 40%; right: 20%; animation-duration: 25s; }

          .tower {
            position: absolute;
            bottom: 40px;
            left: 10%;
            width: 60px;
            height: 150px;
            z-index: 15;
            transform: rotate(-5deg);
          }

          .tower-main,
          .tower-top,
          .tower-roof {
            transform: rotate(5deg);
          }

          .tower-main {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 45px;
            height: 105px;
            background: #ffb5b5;
            border-radius: 8px 8px 0 0;
            box-shadow: inset -10px 0 15px -5px rgba(0,0,0,0.1);
          }

          .tower-main::after {
            content: '';
            position: absolute;
            top: -10px;
            left: 0;
            right: 0;
            height: 10px;
            background: #ffc2c2;
            border-radius: 5px 5px 0 0;
          }

          .tower-top {
            position: absolute;
            bottom: 105px;
            left: 50%;
            transform: translateX(-50%);
            width: 52px;
            height: 30px;
            background: #ffc2c2;
            border-radius: 8px 8px 0 0;
            box-shadow: inset -10px 0 15px -5px rgba(0,0,0,0.1);
          }

          .tower-top::after {
            content: '';
            position: absolute;
            top: -5px;
            left: -3px;
            right: -3px;
            height: 5px;
            background: #ffd4d4;
            border-radius: 5px 5px 0 0;
          }

          .tower-roof {
            position: absolute;
            bottom: 135px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 22px solid transparent;
            border-right: 22px solid transparent;
            border-bottom: 22px solid #ffd4d4;
          }

          .window {
            position: absolute;
            width: 12px;
            height: 16px;
            background: rgba(255,255,255,0.9);
            border-radius: 10px 10px 0 0;
            box-shadow: inset 0 -5px 10px -5px rgba(0,0,0,0.1);
            transform: rotate(5deg);
          }

          .window:nth-child(1) { top: 15px; left: 8px; }
          .window:nth-child(2) { top: 15px; right: 8px; }
          .window:nth-child(3) { top: 45px; left: 8px; }
          .window:nth-child(4) { top: 45px; right: 8px; }
          .window:nth-child(5) { top: 75px; left: 8px; }
          .window:nth-child(6) { top: 75px; right: 8px; }

          .tower-top .window {
            width: 10px;
            height: 14px;
            top: 8px;
            transform: rotate(5deg);
          }

          .tower-top .window:nth-child(1) { left: 10px; }
          .tower-top .window:nth-child(2) { right: 10px; }
        `}</style>

        {/* Left Section with Illustration */}
        <motion.div 
          className="hidden md:flex md:w-1/2 bg-gradient-to-b from-[#ffd4d4] to-[#ffe8e0] items-center justify-center p-12 relative overflow-hidden"
          animate={isAnimating ? { x: "-100%" } : { x: "0%" }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Illustration */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Medieval Tower */}
            <div className="tower">
              <div className="tower-roof"></div>
              <div className="tower-top">
                <div className="window"></div>
                <div className="window"></div>
              </div>
              <div className="tower-main">
                <div className="window"></div>
                <div className="window"></div>
                <div className="window"></div>
                <div className="window"></div>
                <div className="window"></div>
                <div className="window"></div>
              </div>
            </div>

            {/* Clouds */}
            <div className="cloud" style={{ top: '10%', left: '10%', animationDuration: '23s' }}></div>
            <div className="cloud" style={{ top: '20%', right: '15%', animationDuration: '26s' }}></div>
            <div className="cloud" style={{ top: '35%', left: '25%', animationDuration: '22s' }}></div>
            <div className="cloud" style={{ top: '15%', left: '60%', animationDuration: '28s' }}></div>
            <div className="cloud" style={{ top: '40%', right: '20%', animationDuration: '25s' }}></div>

            {/* Sun */}
            <div className="absolute w-32 h-32 bg-white rounded-full top-12 left-1/2 -translate-x-1/2" />
            
            {/* Hills */}
            <div className="absolute bottom-0 left-0 right-0 h-48 z-10">
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-[#ffb5b5] rounded-[100%] translate-y-16" />
              <div className="absolute bottom-0 left-1/4 right-0 h-24 bg-[#ffc2c2] rounded-[100%] translate-y-8" />
              <div className="absolute bottom-0 right-12 w-4 h-12 bg-[#d4a5a5] skew-x-12" />
            </div>
          </div>

          {/* Geometric Shapes */}
          <div ref={containerRef} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[400px] h-[300px] z-30">
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
              {/* Purple Rectangle */}
              <div className="absolute -translate-x-20 -translate-y-52 w-24 h-48 bg-[#8E44AD] rounded-lg flex flex-col items-center pt-4">
                <div className="flex gap-2 relative">
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
              </div>
              {/* Black Rectangle */}
              <div className="absolute -translate-x-4 -translate-y-40 w-20 h-36 bg-black rounded-lg flex flex-col items-center pt-4">
                <div className="flex gap-2 relative">
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
              </div>
              {/* Yellow Oval */}
              <div className="absolute translate-x-12 -translate-y-36 w-24 h-32 bg-[#F1C40F] rounded-full flex flex-col items-center justify-center">
                <div className="w-7 h-7 bg-white rounded-full relative overflow-hidden mb-2">
                  <motion.div
                    className="w-3.5 h-3.5 bg-black rounded-full absolute"
                    animate={{
                      x: calculateEyePosition(3.5, 3.5).x,
                      y: calculateEyePosition(3.5, 3.5).y,
                    }}
                  />
                </div>
                <div className="w-8 h-1 bg-black rounded-full" />
              </div>
              {/* Orange Semicircle */}
              <div className="absolute -translate-x-8 -translate-y-20 w-32 h-16 bg-[#FFA726] rounded-t-full flex flex-col items-center pt-4">
                <div className="flex gap-4 relative">
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
                <div className="w-8 h-4 border-b-2 border-black rounded-b-full mt-1" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Section with Form */}
        <motion.div 
          className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center"
          animate={isAnimating ? { x: "100%" } : { x: "0%" }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-[400px] mx-auto space-y-6">
            <div className="text-center space-y-2">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Voltaflow%20Isologotipo-J5rlITjDdVDQXdUQ9OjqU2TCbWmYYR.png"
                alt="Voltaflow Logo"
                className="h-12 mx-auto mb-6"
              />
              <h1 className="text-2xl md:text-3xl font-bold text-black">Welcome back!</h1>
              <p className="text-sm text-[#7F8C8D]">Please enter your details</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-[#BDC3C7]" />
                  <label htmlFor="remember" className="text-sm text-[#7F8C8D]">
                    Remember me
                  </label>
                </div>
                <Link href="#" className="text-sm text-[#3498DB] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <div className="space-y-3">
                <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white h-11">
                  Log In
                </Button>
              </div>
            </form>

            <div className="text-center text-sm text-[#7F8C8D]">
              Don&apos;t have an account?{" "}
              <Link href="#" className="text-[#3498DB] hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
              <Loader2 className="h-8 w-8 animate-spin text-black" />
              <p className="text-lg font-semibold text-black">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}