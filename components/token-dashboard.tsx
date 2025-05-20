"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, MapPin, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for crop tokens
const cropTokens = [
  {
    id: "rice-ph",
    name: "RICE-PH",
    location: "Central Luzon, Philippines",
    expectedYield: "5.2 tons/hectare",
    returnPercentage: 12.5,
    harvestDate: "October 2025",
    raisedAmount: 75000,
    targetAmount: 100000,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Rice farming in the fertile plains of Central Luzon with sustainable practices and high-yield varieties.",
    priceHistory: [10.2, 10.5, 10.8, 11.2, 11.5, 11.8, 12.2, 12.5],
  },
  {
    id: "coconut-ph",
    name: "COCONUT-PH",
    location: "Bicol Region, Philippines",
    expectedYield: "15,000 nuts/hectare",
    returnPercentage: 14.2,
    harvestDate: "Continuous",
    raisedAmount: 120000,
    targetAmount: 150000,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Organic coconut farming with integrated processing for high-value products like virgin coconut oil and coir.",
    priceHistory: [12.1, 12.4, 12.8, 13.2, 13.5, 13.8, 14.0, 14.2],
  },
  {
    id: "coffee-co",
    name: "COFFEE-CO",
    location: "Antioquia, Colombia",
    expectedYield: "1,800 kg/hectare",
    returnPercentage: 16.8,
    harvestDate: "April 2025",
    raisedAmount: 85000,
    targetAmount: 200000,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Shade-grown specialty coffee from high-altitude farms with fair trade certification and direct market access.",
    priceHistory: [14.2, 14.5, 14.8, 15.2, 15.5, 15.8, 16.4, 16.8],
  },
  {
    id: "cacao-gh",
    name: "CACAO-GH",
    location: "Western Region, Ghana",
    expectedYield: "800 kg/hectare",
    returnPercentage: 15.3,
    harvestDate: "December 2025",
    raisedAmount: 60000,
    targetAmount: 120000,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Sustainable cacao farming with agroforestry techniques, producing premium beans for specialty chocolate makers.",
    priceHistory: [13.1, 13.4, 13.8, 14.2, 14.5, 14.8, 15.0, 15.3],
  },
  {
    id: "avocado-mx",
    name: "AVOCADO-MX",
    location: "Michoacán, Mexico",
    expectedYield: "10 tons/hectare",
    returnPercentage: 18.5,
    harvestDate: "Year-round",
    raisedAmount: 180000,
    targetAmount: 250000,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Water-efficient avocado production with regenerative agriculture practices and direct export channels.",
    priceHistory: [15.2, 15.8, 16.2, 16.8, 17.2, 17.5, 18.0, 18.5],
  },
  {
    id: "wheat-in",
    name: "WHEAT-IN",
    location: "Punjab, India",
    expectedYield: "4.5 tons/hectare",
    returnPercentage: 11.8,
    harvestDate: "March 2025",
    raisedAmount: 90000,
    targetAmount: 150000,
    image: "/placeholder.svg?height=300&width=400",
    description:
      "Climate-resilient wheat varieties with precision farming techniques to optimize water and fertilizer use.",
    priceHistory: [9.8, 10.2, 10.5, 10.8, 11.0, 11.2, 11.5, 11.8],
  },
]

export function TokenDashboard() {
  const [selectedToken, setSelectedToken] = useState(null)
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [isInvesting, setIsInvesting] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const handleInvest = (token) => {
    setSelectedToken(token)
    setInvestmentAmount("")
    setIsInvesting(true)
  }

  const confirmInvestment = () => {
    // In a real app, this would connect to a blockchain transaction
    console.log(`Investing ${investmentAmount} in ${selectedToken.name}`)
    setIsInvesting(false)
    // Show success notification or redirect
  }

  const filteredTokens =
    activeTab === "all"
      ? cropTokens
      : cropTokens.filter((token) => {
          if (activeTab === "asia") return token.id.endsWith("-ph") || token.id.endsWith("-in")
          if (activeTab === "americas") return token.id.endsWith("-co") || token.id.endsWith("-mx")
          if (activeTab === "africa") return token.id.endsWith("-gh")
          return true
        })

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Token Investment Dashboard</h1>
          <p className="text-gray-600 mt-2">Invest in tokenized agricultural assets from around the world</p>
        </div>
        <div className="flex items-center gap-4">
          <Input placeholder="Search tokens..." className="w-full md:w-64" />
          <Button>My Portfolio</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Tokens</TabsTrigger>
          <TabsTrigger value="asia">Asia</TabsTrigger>
          <TabsTrigger value="americas">Americas</TabsTrigger>
          <TabsTrigger value="africa">Africa</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTokens.map((token) => (
          <Card key={token.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 overflow-hidden">
              <img src={token.image || "/placeholder.svg"} alt={token.name} className="w-full h-full object-cover" />
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{token.name}</CardTitle>
                <div className="flex items-center text-green-600 font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {token.returnPercentage}%
                </div>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {token.location}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Funding Progress</span>
                  <span>
                    ${token.raisedAmount.toLocaleString()} / ${token.targetAmount.toLocaleString()}
                  </span>
                </div>
                <Progress value={(token.raisedAmount / token.targetAmount) * 100} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Expected Yield</p>
                  <p className="font-medium">{token.expectedYield}</p>
                </div>
                <div>
                  <p className="text-gray-500">Harvest Date</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <p className="font-medium">{token.harvestDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleInvest(token)}>
                Invest Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Investment Dialog */}
      <Dialog open={isInvesting} onOpenChange={setIsInvesting}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invest in {selectedToken?.name}</DialogTitle>
            <DialogDescription>Enter the amount you want to invest in this agricultural token.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right col-span-1">
                Amount ($)
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="col-span-3"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Expected Return</span>
                <span className="font-medium">{selectedToken?.returnPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Payout</span>
                <span className="font-medium">
                  $
                  {investmentAmount
                    ? (Number.parseFloat(investmentAmount) * (1 + selectedToken?.returnPercentage / 100)).toFixed(2)
                    : "0.00"}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvesting(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={confirmInvestment}
              disabled={!investmentAmount || Number.parseFloat(investmentAmount) <= 0}
            >
              Confirm Investment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
