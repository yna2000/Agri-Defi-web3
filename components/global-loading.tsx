"use client"

import { useState, useEffect } from "react"
import { CircularProgress } from "@mui/material"
import { usePathname, useSearchParams } from "next/navigation"

export function GlobalLoading() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => {
      setLoading(true)
    }

    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false)
      }, 500) // Small delay to ensure smooth transition
    }

    // Add event listeners for route changes
    window.addEventListener("beforeunload", handleStart)
    window.addEventListener("load", handleComplete)

    // Clean up event listeners
    return () => {
      window.removeEventListener("beforeunload", handleStart)
      window.removeEventListener("load", handleComplete)
    }
  }, [])

  // Reset loading state when route changes
  useEffect(() => {
    setLoading(false)
  }, [pathname, searchParams])

  if (!loading) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90 transition-opacity duration-300 ${
        loading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <CircularProgress size={60} thickness={4} style={{ color: "#16a34a" }} />
      <p className="mt-4 text-lg font-medium text-gray-800">Loading AgriDeFi...</p>
    </div>
  )
}
