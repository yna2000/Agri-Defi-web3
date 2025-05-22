"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { CircularProgress } from "@mui/material"
import { Coins } from "lucide-react"

// Create context
type LoadingContextType = {
  isLoading: boolean
  progress: number
  startLoading: () => void
  stopLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function EnhancedLoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing AgriDeFi...")
  const pathname = usePathname()
  const progressInterval = useRef<NodeJS.Timeout | null>(null)
  const loadingTextInterval = useRef<NodeJS.Timeout | null>(null)

  // Loading text options
  const loadingTexts = [
    "Initializing AgriDeFi...",
    "Connecting to blockchain...",
    "Loading agricultural data...",
    "Fetching market prices...",
    "Analyzing climate data...",
    "Preparing climate data...",
    "Loading farmer profiles...",
    "Calculating yield forecasts...",
    "Verifying smart contracts...",
    "Almost there...",
  ]

  const startLoading = () => {
    setIsLoading(true)
    setProgress(0)
    setLoadingText(loadingTexts[0])

    // Clear any existing intervals
    if (progressInterval.current) clearInterval(progressInterval.current)
    if (loadingTextInterval.current) clearInterval(loadingTextInterval.current)

    // Set up progress interval - 20 seconds to reach 100%
    progressInterval.current = setInterval(() => {
      setProgress((prevProgress) => {
        // Faster progress to complete in 3 seconds
        if (prevProgress >= 95) {
          return prevProgress + 2.5
        } else if (prevProgress >= 85) {
          return prevProgress + 5
        } else {
          return prevProgress + 7
        }
      })
    }, 100) // Update more frequently (every 100ms)

    // Set up loading text interval - change text every 2 seconds
    let textIndex = 0
    loadingTextInterval.current = setInterval(() => {
      textIndex = (textIndex + 1) % loadingTexts.length
      setLoadingText(loadingTexts[textIndex])
    }, 500) // Change text every 0.5 seconds instead of 2 seconds
  }

  const stopLoading = () => {
    // Quickly finish the progress
    setProgress(100)

    // Clear intervals
    if (progressInterval.current) clearInterval(progressInterval.current)
    if (loadingTextInterval.current) clearInterval(loadingTextInterval.current)

    // Set final loading text
    setLoadingText("Welcome to AgriDeFi!")

    // Hide loading after a short delay
    setTimeout(() => {
      setIsLoading(false)
      setProgress(0)
    }, 1000)
  }

  // Handle initial page load
  useEffect(() => {
    // Start loading on initial page load
    startLoading()

    // Stop loading after 20 seconds
    const timer = setTimeout(() => {
      stopLoading()
    }, 3000) // 3 seconds instead of 20000

    return () => clearTimeout(timer)
  }, [])

  // Reset loading state when pathname changes
  useEffect(() => {
    if (isLoading) {
      // If we're already loading and the path changes, keep loading
      // but don't restart the timer
    } else {
      // If we're not loading and the path changes, start loading
      startLoading()

      // Stop loading after 20 seconds
      const timer = setTimeout(() => {
        stopLoading()
      }, 3000) // 3 seconds instead of 20000

      return () => clearTimeout(timer)
    }
  }, [pathname])

  // Handle progress completion
  useEffect(() => {
    if (progress >= 100) {
      stopLoading()
    }
  }, [progress])

  return (
    <LoadingContext.Provider value={{ isLoading, progress, startLoading, stopLoading }}>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
          {/* Top progress bar */}
          <div className="fixed top-0 left-0 w-full">
            <div className="h-2 w-full bg-gray-200">
              <div className="h-full bg-green-600 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Logo animation */}
          <div className="mb-8 animate-bounce">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-white">
              <Coins className="h-10 w-10" />
            </div>
          </div>

          {/* Circular progress */}
          <div className="relative mb-6">
            <CircularProgress
              size={120}
              thickness={4}
              variant="determinate"
              value={progress}
              style={{ color: "#16a34a" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Loading text */}
          <p className="text-2xl font-semibold text-gray-800">{loadingText}</p>

          {/* Loading description */}
          <p className="mt-4 max-w-md text-center text-gray-600">
            We're preparing your sustainable agriculture investment platform. This may take a moment...
          </p>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  )
}

// Custom hook to use loading context
export function useEnhancedLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useEnhancedLoading must be used within an EnhancedLoadingProvider")
  }
  return context
}
