import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { EnhancedLoadingProvider } from "@/components/enhanced-loading-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AgriDeFi - Blockchain-Powered Agriculture Investment",
  description: "Invest in the future of farming powered by blockchain technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EnhancedLoadingProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <AppSidebar />
                <div className="flex-1">{children}</div>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </EnhancedLoadingProvider>
      </body>
    </html>
  )
}
