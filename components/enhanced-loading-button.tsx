"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEnhancedLoading } from "./enhanced-loading-provider"

interface EnhancedLoadingButtonProps {
  href: string
  children: ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
}

export function EnhancedLoadingButton({
  href,
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
}: EnhancedLoadingButtonProps) {
  const router = useRouter()
  const { startLoading } = useEnhancedLoading()

  const handleClick = () => {
    // Show loading state
    startLoading()

    // Navigate after a delay to ensure loading is visible
    setTimeout(() => {
      router.push(href)
    }, 300)

    if (onClick) onClick()
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleClick}>
      {children}
    </Button>
  )
}
