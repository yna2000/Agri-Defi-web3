"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  BarChart3,
  History,
  Lock,
  Unlock,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

// Mock data for wallet
const walletData = {
  address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  balance: 2.45,
  tokens: [
    {
      id: "rice-ph",
      name: "RICE-PH",
      symbol: "RICE",
      balance: 500,
      value: 625,
      priceChange: 5.2,
      priceDirection: "up",
    },
    {
      id: "coconut-ph",
      name: "COCONUT-PH",
      symbol: "COCO",
      balance: 750,
      value: 1125,
      priceChange: 3.8,
      priceDirection: "up",
    },
    {
      id: "coffee-co",
      name: "COFFEE-CO",
      symbol: "COFF",
      balance: 300,
      value: 510,
      priceChange: -1.2,
      priceDirection: "down",
    },
    {
      id: "cacao-gh",
      name: "CACAO-GH",
      symbol: "CACAO",
      balance: 200,
      value: 320,
      priceChange: 2.5,
      priceDirection: "up",
    },
  ],
  staked: [
    {
      id: "rice-ph-stake",
      name: "RICE-PH",
      symbol: "RICE",
      amount: 1000,
      value: 1250,
      apy: 12.5,
      lockPeriod: "6 months",
      unlockDate: "October 15, 2025",
      rewards: 62.5,
    },
    {
      id: "coconut-ph-stake",
      name: "COCONUT-PH",
      symbol: "COCO",
      amount: 500,
      value: 750,
      apy: 14.2,
      lockPeriod: "12 months",
      unlockDate: "May 1, 2026",
      rewards: 53.25,
    },
  ],
  transactions: [
    {
      id: "tx-001",
      type: "buy",
      token: "RICE-PH",
      amount: 500,
      value: 600,
      date: "May 1, 2025",
      status: "completed",
      txHash: "0x1a2b3c...",
    },
    {
      id: "tx-002",
      type: "stake",
      token: "RICE-PH",
      amount: 1000,
      value: 1200,
      date: "May 2, 2025",
      status: "completed",
      txHash: "0x4d5e6f...",
    },
    {
      id: "tx-003",
      type: "buy",
      token: "COCONUT-PH",
      amount: 750,
      value: 1050,
      date: "May 5, 2025",
      status: "completed",
      txHash: "0x7g8h9i...",
    },
    {
      id: "tx-004",
      type: "stake",
      token: "COCONUT-PH",
      amount: 500,
      value: 700,
      date: "May 6, 2025",
      status: "completed",
      txHash: "0xj0k1l2...",
    },
    {
      id: "tx-005",
      type: "buy",
      token: "COFFEE-CO",
      amount: 300,
      value: 480,
      date: "May 10, 2025",
      status: "completed",
      txHash: "0xm3n4o5...",
    },
    {
      id: "tx-006",
      type: "buy",
      token: "CACAO-GH",
      amount: 200,
      value: 300,
      date: "May 15, 2025",
      status: "completed",
      txHash: "0xp6q7r8...",
    },
  ],
}

export function WalletDashboard() {
  const [isConnected, setIsConnected] = useState(false)
  const [activeTab, setActiveTab] = useState("portfolio")

  // Calculate total portfolio value
  const totalPortfolioValue = walletData.tokens.reduce((total, token) => total + token.value, 0)
  const totalStakedValue = walletData.staked.reduce((total, stake) => total + stake.value, 0)
  const totalValue = totalPortfolioValue + totalStakedValue

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // In a real app, you would show a toast notification
    console.log("Copied to clipboard:", text)
  }

  const formatAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const getTransactionIcon = (type) => {
    switch (type) {
      case "buy":
        return <ArrowDownRight className="h-4 w-4 text-green-500" />
      case "sell":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      case "stake":
        return <Lock className="h-4 w-4 text-blue-500" />
      case "unstake":
        return <Unlock className="h-4 w-4 text-orange-500" />
      default:
        return <History className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Wallet & Account</h1>
        <p className="text-gray-600 mt-2">Manage your crypto wallet, tokens, and staking</p>
      </div>

      {!isConnected ? (
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Connect your wallet to view your portfolio and manage your investments</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full max-w-xs" onClick={() => setIsConnected(true)}>
              <ConnectWalletButton />
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
                <CardDescription>Your connected wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-green-600" />
                    <span className="font-medium">{formatAddress(walletData.address)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(walletData.address)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">ETH Balance</p>
                  <p className="text-2xl font-bold">{walletData.balance} ETH</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Disconnect
                </Button>
              </CardFooter>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Portfolio Overview</CardTitle>
                <CardDescription>Summary of your agricultural investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Token Holdings</p>
                    <p className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{walletData.tokens.length} tokens</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Staked Value</p>
                    <p className="text-2xl font-bold">${totalStakedValue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{walletData.staked.length} positions</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Asset Allocation</h3>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>

                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Portfolio chart visualization would go here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="portfolio" className="mb-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="portfolio">Token Portfolio</TabsTrigger>
              <TabsTrigger value="staking">Staking</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Token Holdings</CardTitle>
                  <CardDescription>Your agricultural token investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Token</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Price Change</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {walletData.tokens.map((token) => (
                        <TableRow key={token.id}>
                          <TableCell>
                            <div className="font-medium">{token.name}</div>
                            <div className="text-sm text-gray-500">{token.symbol}</div>
                          </TableCell>
                          <TableCell>{token.balance.toLocaleString()}</TableCell>
                          <TableCell>${token.value.toLocaleString()}</TableCell>
                          <TableCell>
                            <div
                              className={`flex items-center ${
                                token.priceDirection === "up" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {token.priceDirection === "up" ? (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              )}
                              {token.priceChange}%
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Buy
                              </Button>
                              <Button variant="outline" size="sm">
                                Sell
                              </Button>
                              <Button variant="outline" size="sm">
                                Stake
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Buy Tokens</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="staking" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Staked Tokens</CardTitle>
                  <CardDescription>Your staked tokens earning rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  {walletData.staked.length > 0 ? (
                    <div className="space-y-6">
                      {walletData.staked.map((stake) => (
                        <div key={stake.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-medium">{stake.name}</h3>
                              <p className="text-sm text-gray-500">{stake.symbol}</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{stake.apy}% APY</Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <p className="text-gray-500">Staked Amount</p>
                              <p className="font-medium">
                                {stake.amount.toLocaleString()} {stake.symbol}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500">Value</p>
                              <p className="font-medium">${stake.value.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Lock Period</p>
                              <p className="font-medium">{stake.lockPeriod}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Unlock Date</p>
                              <p className="font-medium">{stake.unlockDate}</p>
                            </div>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-md mb-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-600">Earned Rewards</span>
                              <span className="font-medium text-green-600">${stake.rewards.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" className="w-full">
                              Claim Rewards
                            </Button>
                            <Button variant="outline" className="w-full">
                              Unstake
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No staked tokens found</div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Stake Tokens</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent blockchain transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Token</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Transaction</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {walletData.transactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>
                            <div className="flex items-center">
                              {getTransactionIcon(tx.type)}
                              <span className="ml-2 capitalize">{tx.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>{tx.token}</TableCell>
                          <TableCell>{tx.amount.toLocaleString()}</TableCell>
                          <TableCell>${tx.value.toLocaleString()}</TableCell>
                          <TableCell>{tx.date}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              <span className="text-xs truncate mr-2">{tx.txHash}</span>
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="ml-auto">
                    Export History
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
