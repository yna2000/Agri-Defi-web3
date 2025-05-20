"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation"
import { CircularProgress } from "@mui/material"

// Create context
type LoadingContextType = {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Reset loading state when route changes
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true)
    }

    const handleRouteChangeComplete = () => {
      // Add a minimum delay to ensure loading is visible
      setTimeout(() => {
        setIsLoading(false)
      }, 1000) // 1 second minimum loading time
    }

    // Add event listeners for route changes
    window.addEventListener("beforeunload", handleRouteChangeStart)

    // Create a MutationObserver to detect DOM changes that might indicate page navigation
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        if (document.readyState === "complete") {
          handleRouteChangeComplete()
        }
      })
    })

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    })

    return () => {
      window.removeEventListener("beforeunload", handleRouteChangeStart)
      observer.disconnect()
    }
  }, [])

  // Force loading state to reset when pathname changes
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [pathname])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white bg-opacity-90">
          <CircularProgress size={70} thickness={5} style={{ color: "#16a34a" }} />
          <p className="mt-6 text-xl font-semibold text-gray-800">Loading AgriDeFi...</p>
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  )
}

// Custom hook to use loading context
export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}
