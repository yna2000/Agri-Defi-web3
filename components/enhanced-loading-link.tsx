"use client"

import type React from "react"

import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEnhancedLoading } from "./enhanced-loading-provider"

interface EnhancedLoadingLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function EnhancedLoadingLink({ href, children, className, onClick }: EnhancedLoadingLinkProps) {
  const router = useRouter()
  const { startLoading } = useEnhancedLoading()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle internal links
    if (href.startsWith("/")) {
      e.preventDefault()

      // Show loading state
      startLoading()

      // Navigate after a delay to ensure loading is visible
      setTimeout(() => {
        router.push(href)
      }, 300)

      if (onClick) onClick()
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
