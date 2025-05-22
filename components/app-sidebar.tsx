"use client"
import { Home, Coins, FileText, Cloud, Users, Wallet, BarChart3 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { EnhancedLoadingLink } from "@/components/enhanced-loading-link"
import { usePathname } from "next/navigation"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

const menuItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Token Investment",
    icon: Coins,
    href: "/dashboard",
  },
  {
    title: "Smart Contracts",
    icon: FileText,
    href: "/smart-contracts",
  },
  {
    title: "Climate Risk",
    icon: Cloud,
    href: "/climate-risk",
  },
  {
    title: "Farmer Stories",
    icon: Users,
    href: "/farmers",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Wallet & Account",
    icon: Wallet,
    href: "/wallet",
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
            <Coins className="h-4 w-4" />
          </div>
          <span className="text-xl font-bold">AgriDeFi</span>
        </div>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <EnhancedLoadingLink href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </EnhancedLoadingLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <ConnectWalletButton />
      </SidebarFooter>
    </Sidebar>
  )
}
