"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function useLoading() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Start loading
  const startLoading = useCallback(() => {
    setLoading(true)
  }, [])

  // Stop loading
  const stopLoading = useCallback(() => {
    setTimeout(() => {
      setLoading(false)
    }, 300) // Small delay for smooth transition
  }, [])

  // Reset loading state when route changes
  useEffect(() => {
    stopLoading()
  }, [pathname, searchParams, stopLoading])

  return { loading, startLoading, stopLoading }
}
