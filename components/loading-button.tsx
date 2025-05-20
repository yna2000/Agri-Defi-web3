"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useLoading } from "./loading-provider"

interface LoadingButtonProps {
  href: string
  children: ReactNode
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  onClick?: () => void
}

export function LoadingButton({
  href,
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
}: LoadingButtonProps) {
  const router = useRouter()
  const { setIsLoading } = useLoading()

  const handleClick = () => {
    // Show loading state
    setIsLoading(true)

    // Force a delay before navigation to ensure loading is visible
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
