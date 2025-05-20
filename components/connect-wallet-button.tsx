"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ConnectWalletButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const connectWallet = async () => {
    // Mock wallet connection
    // In a real app, you would use ethers.js or web3modal
    try {
      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful connection
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 12) + "..."
      setWalletAddress(mockAddress)
      setIsConnected(true)
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  return (
    <>
      {isConnected ? (
        <Button variant="outline" className="w-full justify-between" onClick={disconnectWallet}>
          <span className="truncate">{walletAddress}</span>
          <Wallet className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect your wallet</DialogTitle>
              <DialogDescription>Connect your wallet to access the AgriDeFi platform.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button onClick={connectWallet} className="w-full">
                Connect with MetaMask
              </Button>
              <Button variant="outline" className="w-full">
                Connect with WalletConnect
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
