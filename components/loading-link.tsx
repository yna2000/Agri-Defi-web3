"use client"

import type React from "react"

import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useLoading } from "./loading-provider"

interface LoadingLinkProps {
  href: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function LoadingLink({ href, children, className, onClick }: LoadingLinkProps) {
  const router = useRouter()
  const { setIsLoading } = useLoading()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle internal links
    if (href.startsWith("/")) {
      e.preventDefault()

      // Show loading state
      setIsLoading(true)

      // Force a delay before navigation to ensure loading is visible
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
