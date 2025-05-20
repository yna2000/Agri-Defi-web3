"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Leaf, TrendingUp, Calendar, ArrowRight, Heart } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for farmers
const farmers = [
  {
    id: "farmer-001",
    name: "Maria Santos",
    location: "Central Luzon, Philippines",
    crops: ["Rice"],
    tokens: ["RICE-PH"],
    experience: 15,
    farmSize: "5 hectares",
    story:
      "Maria is a third-generation rice farmer who has embraced sustainable farming practices. With the help of AgriDeFi investors, she has been able to implement water-saving irrigation systems and organic pest control methods, increasing her yield by 30% while reducing environmental impact.",
    impact: {
      yieldIncrease: 30,
      incomeGrowth: 45,
      sustainabilityScore: 85,
      communityJobs: 8,
    },
    image: "/placeholder.svg?height=400&width=400",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    nextHarvest: "October 2025",
    investmentNeeds: "Irrigation system upgrade and organic certification",
    totalRaised: 75000,
    targetAmount: 100000,
  },
  {
    id: "farmer-002",
    name: "Juan Reyes",
    location: "Bicol Region, Philippines",
    crops: ["Coconut"],
    tokens: ["COCONUT-PH"],
    experience: 20,
    farmSize: "12 hectares",
    story:
      "Juan manages a family-owned coconut plantation that has been operating for over 50 years. Through AgriDeFi, he has secured funding to establish a small processing facility that allows him to produce virgin coconut oil and other high-value products, increasing his income by 65% and creating jobs for 15 local residents.",
    impact: {
      yieldIncrease: 25,
      incomeGrowth: 65,
      sustainabilityScore: 90,
      communityJobs: 15,
    },
    image: "/placeholder.svg?height=400&width=400",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    nextHarvest: "Continuous",
    investmentNeeds: "Processing equipment and organic certification",
    totalRaised: 120000,
    targetAmount: 150000,
  },
  {
    id: "farmer-003",
    name: "Carlos Mendoza",
    location: "Antioquia, Colombia",
    crops: ["Coffee"],
    tokens: ["COFFEE-CO"],
    experience: 12,
    farmSize: "3 hectares",
    story:
      "Carlos is a specialty coffee producer who has been working to improve the quality and sustainability of his farm. With investment through AgriDeFi, he has implemented shade-grown techniques and built a small wet mill for processing, allowing him to sell directly to specialty roasters at premium prices. His income has increased by 80% and he now employs 6 people from his community.",
    impact: {
      yieldIncrease: 15,
      incomeGrowth: 80,
      sustainabilityScore: 95,
      communityJobs: 6,
    },
    image: "/placeholder.svg?height=400&width=400",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    nextHarvest: "April 2025",
    investmentNeeds: "Quality control equipment and export certification",
    totalRaised: 85000,
    targetAmount: 200000,
  },
  {
    id: "farmer-004",
    name: "Kwame Osei",
    location: "Western Region, Ghana",
    crops: ["Cacao"],
    tokens: ["CACAO-GH"],
    experience: 18,
    farmSize: "4 hectares",
    story:
      "Kwame has transformed his cacao farm using agroforestry techniques that integrate fruit trees and timber species with cacao. This approach has improved soil health, created habitat for beneficial insects, and diversified his income streams. With AgriDeFi funding, he has built a fermentation facility that allows him to produce premium beans for craft chocolate makers.",
    impact: {
      yieldIncrease: 20,
      incomeGrowth: 55,
      sustainabilityScore: 92,
      communityJobs: 10,
    },
    image: "/placeholder.svg?height=400&width=400",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    nextHarvest: "December 2025",
    investmentNeeds: "Fermentation equipment and organic certification",
    totalRaised: 60000,
    targetAmount: 120000,
  },
  {
    id: "farmer-005",
    name: "Elena Rodriguez",
    location: "Michoacán, Mexico",
    crops: ["Avocado"],
    tokens: ["AVOCADO-MX"],
    experience: 10,
    farmSize: "8 hectares",
    story:
      "Elena has pioneered water-efficient avocado production in a region facing increasing water scarcity. Through AgriDeFi, she has implemented precision irrigation systems and soil moisture monitoring that has reduced water usage by 40% while maintaining high yields. She has also established direct relationships with exporters, increasing her income substantially.",
    impact: {
      yieldIncrease: 25,
      incomeGrowth: 70,
      sustainabilityScore: 88,
      communityJobs: 12,
    },
    image: "/placeholder.svg?height=400&width=400",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    nextHarvest: "Year-round",
    investmentNeeds: "Water-efficient irrigation and packing facility",
    totalRaised: 180000,
    targetAmount: 250000,
  },
  {
    id: "farmer-006",
    name: "Rajiv Patel",
    location: "Punjab, India",
    crops: ["Wheat"],
    tokens: ["WHEAT-IN"],
    experience: 25,
    farmSize: "10 hectares",
    story:
      "Rajiv has been transitioning from conventional wheat farming to regenerative agriculture practices. With support from AgriDeFi investors, he has implemented no-till farming, cover cropping, and reduced chemical inputs, improving soil health and reducing production costs. His approach has become a model for other farmers in the region.",
    impact: {
      yieldIncrease: 10,
      incomeGrowth: 35,
      sustainabilityScore: 80,
      communityJobs: 5,
    },
    image: "/placeholder.svg?height=400&width=400",
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    nextHarvest: "March 2025",
    investmentNeeds: "Precision farming equipment and seed storage",
    totalRaised: 90000,
    targetAmount: 150000,
  },
]

export function FarmerProfiles() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedFarmer, setSelectedFarmer] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredFarmers =
    activeTab === "all"
      ? farmers
      : farmers.filter((farmer) => {
          if (activeTab === "asia") return farmer.location.includes("Philippines") || farmer.location.includes("India")
          if (activeTab === "americas")
            return farmer.location.includes("Colombia") || farmer.location.includes("Mexico")
          if (activeTab === "africa") return farmer.location.includes("Ghana")
          return true
        })

  const openFarmerDetails = (farmer) => {
    setSelectedFarmer(farmer)
    setIsDialogOpen(true)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Farmer Stories</h1>
        <p className="text-gray-600 mt-2">Meet the farmers behind your investments and see the impact you're making</p>
      </div>

      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Farmers</TabsTrigger>
          <TabsTrigger value="asia">Asia</TabsTrigger>
          <TabsTrigger value="americas">Americas</TabsTrigger>
          <TabsTrigger value="africa">Africa</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer) => (
          <Card key={farmer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img src={farmer.image || "/placeholder.svg"} alt={farmer.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div>
                  <h3 className="text-white text-xl font-bold">{farmer.name}</h3>
                  <div className="flex items-center text-white/80 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {farmer.location}
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {farmer.crops.map((crop) => (
                  <Badge key={crop} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Leaf className="h-3 w-3 mr-1" />
                    {crop}
                  </Badge>
                ))}
                {farmer.tokens.map((token) => (
                  <Badge key={token} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {token}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-600 line-clamp-3 mb-4">{farmer.story.substring(0, 120)}...</p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Income Growth</p>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
                    <p className="font-medium text-green-600">+{farmer.impact.incomeGrowth}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500">Next Harvest</p>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <p className="font-medium">{farmer.nextHarvest}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Funding Progress</span>
                  <span>
                    ${farmer.totalRaised.toLocaleString()} / ${farmer.targetAmount.toLocaleString()}
                  </span>
                </div>
                <Progress value={(farmer.totalRaised / farmer.targetAmount) * 100} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => openFarmerDetails(farmer)}>
                View Full Story
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Farmer Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedFarmer && (
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedFarmer.name}'s Story</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {selectedFarmer.location}
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedFarmer.image || "/placeholder.svg"}
                    alt={selectedFarmer.name}
                    className="w-full h-64 object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About the Farm</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Experience</p>
                        <p className="font-medium">{selectedFarmer.experience} years</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Farm Size</p>
                        <p className="font-medium">{selectedFarmer.farmSize}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Crops</p>
                        <p className="font-medium">{selectedFarmer.crops.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Next Harvest</p>
                        <p className="font-medium">{selectedFarmer.nextHarvest}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Investment Impact</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Yield Increase</p>
                        <p className="font-medium text-green-600">+{selectedFarmer.impact.yieldIncrease}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Income Growth</p>
                        <p className="font-medium text-green-600">+{selectedFarmer.impact.incomeGrowth}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Sustainability Score</p>
                        <p className="font-medium">{selectedFarmer.impact.sustainabilityScore}/100</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Community Jobs</p>
                        <p className="font-medium">{selectedFarmer.impact.communityJobs} people</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Investment Needs</h3>
                    <p className="text-sm">{selectedFarmer.investmentNeeds}</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Funding Progress</span>
                        <span>
                          ${selectedFarmer.totalRaised.toLocaleString()} / $
                          {selectedFarmer.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={(selectedFarmer.totalRaised / selectedFarmer.targetAmount) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Farmer's Story</h3>
                  <p className="text-sm text-gray-600">{selectedFarmer.story}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Farm Gallery</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFarmer.gallery.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden h-32">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${selectedFarmer.name}'s farm ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Associated Tokens</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedFarmer.tokens.map((token) => (
                      <Badge key={token} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {token}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Heart className="mr-2 h-4 w-4" />
                    Support This Farmer
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
