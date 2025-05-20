"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Droplets, Wind, AlertTriangle, CloudRain, Sun, CloudLightning } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for climate risk
const regions = [
  {
    id: "central-luzon",
    name: "Central Luzon, Philippines",
    crops: ["RICE-PH"],
    currentWeather: {
      condition: "Partly Cloudy",
      temperature: 32,
      humidity: 75,
      rainfall: 12,
      windSpeed: 15,
      icon: Sun,
    },
    forecast: [
      { day: "Today", condition: "Partly Cloudy", high: 32, low: 26, rainChance: 20, icon: Sun },
      { day: "Tomorrow", condition: "Scattered Showers", high: 30, low: 25, rainChance: 60, icon: CloudRain },
      { day: "Wednesday", condition: "Thunderstorms", high: 29, low: 24, rainChance: 80, icon: CloudLightning },
      { day: "Thursday", condition: "Scattered Showers", high: 30, low: 25, rainChance: 50, icon: CloudRain },
      { day: "Friday", condition: "Partly Cloudy", high: 31, low: 26, rainChance: 30, icon: Sun },
    ],
    riskLevel: "medium",
    activeInsurance: [
      {
        id: "ins-001",
        type: "Flood Insurance",
        coverage: 50000,
        premium: 2500,
        startDate: "January 15, 2025",
        endDate: "January 14, 2026",
        triggers: "Rainfall exceeding 200mm in 24 hours",
        status: "active",
      },
      {
        id: "ins-002",
        type: "Drought Protection",
        coverage: 30000,
        premium: 1500,
        startDate: "January 15, 2025",
        endDate: "January 14, 2026",
        triggers: "Less than 10mm rainfall over 30 consecutive days",
        status: "active",
      },
    ],
    payoutHistory: [
      {
        date: "September 15, 2024",
        event: "Typhoon Mangkhut",
        amount: 35000,
        status: "completed",
      },
    ],
    weatherAlerts: [
      {
        type: "warning",
        message: "Potential heavy rainfall expected in the next 48 hours",
        date: "May 20, 2025",
      },
    ],
  },
  {
    id: "bicol-region",
    name: "Bicol Region, Philippines",
    crops: ["COCONUT-PH"],
    currentWeather: {
      condition: "Scattered Showers",
      temperature: 29,
      humidity: 82,
      rainfall: 25,
      windSpeed: 20,
      icon: CloudRain,
    },
    forecast: [
      { day: "Today", condition: "Scattered Showers", high: 29, low: 24, rainChance: 70, icon: CloudRain },
      { day: "Tomorrow", condition: "Thunderstorms", high: 28, low: 23, rainChance: 90, icon: CloudLightning },
      { day: "Wednesday", condition: "Thunderstorms", high: 27, low: 23, rainChance: 80, icon: CloudLightning },
      { day: "Thursday", condition: "Scattered Showers", high: 28, low: 24, rainChance: 60, icon: CloudRain },
      { day: "Friday", condition: "Partly Cloudy", high: 30, low: 25, rainChance: 40, icon: Sun },
    ],
    riskLevel: "high",
    activeInsurance: [
      {
        id: "ins-003",
        type: "Typhoon Protection",
        coverage: 80000,
        premium: 4000,
        startDate: "February 1, 2025",
        endDate: "January 31, 2026",
        triggers: "Sustained winds exceeding 150 km/h",
        status: "active",
      },
    ],
    payoutHistory: [
      {
        date: "November 1, 2024",
        event: "Typhoon Goni",
        amount: 65000,
        status: "completed",
      },
      {
        date: "December 3, 2023",
        event: "Typhoon Kammuri",
        amount: 45000,
        status: "completed",
      },
    ],
    weatherAlerts: [
      {
        type: "alert",
        message: "Typhoon approaching - expected to make landfall in 72 hours",
        date: "May 21, 2025",
      },
    ],
  },
  {
    id: "antioquia",
    name: "Antioquia, Colombia",
    crops: ["COFFEE-CO"],
    currentWeather: {
      condition: "Partly Cloudy",
      temperature: 24,
      humidity: 65,
      rainfall: 8,
      windSpeed: 10,
      icon: Sun,
    },
    forecast: [
      { day: "Today", condition: "Partly Cloudy", high: 24, low: 18, rainChance: 30, icon: Sun },
      { day: "Tomorrow", condition: "Partly Cloudy", high: 25, low: 17, rainChance: 20, icon: Sun },
      { day: "Wednesday", condition: "Sunny", high: 26, low: 18, rainChance: 10, icon: Sun },
      { day: "Thursday", condition: "Scattered Showers", high: 24, low: 17, rainChance: 40, icon: CloudRain },
      { day: "Friday", condition: "Scattered Showers", high: 23, low: 16, rainChance: 50, icon: CloudRain },
    ],
    riskLevel: "low",
    activeInsurance: [
      {
        id: "ins-004",
        type: "Frost Protection",
        coverage: 40000,
        premium: 2000,
        startDate: "March 1, 2025",
        endDate: "February 28, 2026",
        triggers: "Temperatures below 0°C for more than 6 hours",
        status: "active",
      },
    ],
    payoutHistory: [],
    weatherAlerts: [],
  },
]

export function ClimateRiskDashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState(regions[0])
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    // Show alert for high risk regions
    if (selectedRegion.riskLevel === "high" && selectedRegion.weatherAlerts.length > 0) {
      setShowAlert(true)

      // Auto-hide alert after 5 seconds
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [selectedRegion])

  const filteredRegions = activeTab === "all" ? regions : regions.filter((region) => region.riskLevel === activeTab)

  const getRiskBadge = (level) => {
    switch (level) {
      case "low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Low Risk
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Medium Risk
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            High Risk
          </Badge>
        )
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Active
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Climate Risk Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor weather conditions and manage parametric insurance for your agricultural investments
        </p>
      </div>

      {showAlert && selectedRegion.weatherAlerts.length > 0 && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Weather Alert</AlertTitle>
          <AlertDescription>
            {selectedRegion.weatherAlerts[0].message} - {selectedRegion.weatherAlerts[0].date}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Monitored Regions</CardTitle>
              <CardDescription>Regions with active crop investments</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="high">High Risk</TabsTrigger>
                  <TabsTrigger value="medium">Medium Risk</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                {filteredRegions.map((region) => (
                  <div
                    key={region.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedRegion.id === region.id ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{region.name}</h3>
                      {getRiskBadge(region.riskLevel)}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">Crops: {region.crops.join(", ")}</div>
                    <div className="flex items-center text-sm">
                      <region.currentWeather.icon className="h-4 w-4 mr-1 text-blue-500" />
                      <span>
                        {region.currentWeather.condition}, {region.currentWeather.temperature}°C
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedRegion && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedRegion.name}</CardTitle>
                      <CardDescription>Current weather conditions and forecast</CardDescription>
                    </div>
                    {getRiskBadge(selectedRegion.riskLevel)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
                      <selectedRegion.currentWeather.icon className="h-8 w-8 mb-2 text-blue-500" />
                      <p className="text-xl font-bold">{selectedRegion.currentWeather.temperature}°C</p>
                      <p className="text-sm text-gray-500">{selectedRegion.currentWeather.condition}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-1">
                        <Droplets className="h-4 w-4 mr-1 text-blue-500" />
                        <p className="text-sm text-gray-500">Humidity</p>
                      </div>
                      <p className="text-lg font-medium">{selectedRegion.currentWeather.humidity}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-1">
                        <CloudRain className="h-4 w-4 mr-1 text-blue-500" />
                        <p className="text-sm text-gray-500">Rainfall</p>
                      </div>
                      <p className="text-lg font-medium">{selectedRegion.currentWeather.rainfall} mm</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center mb-1">
                        <Wind className="h-4 w-4 mr-1 text-blue-500" />
                        <p className="text-sm text-gray-500">Wind Speed</p>
                      </div>
                      <p className="text-lg font-medium">{selectedRegion.currentWeather.windSpeed} km/h</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium mb-4">5-Day Forecast</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    {selectedRegion.forecast.map((day, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                        <p className="text-sm font-medium mb-2">{day.day}</p>
                        <day.icon className="h-8 w-8 mb-2 text-blue-500" />
                        <p className="text-sm">
                          {day.high}° / {day.low}°
                        </p>
                        <div className="flex items-center mt-2">
                          <Droplets className="h-3 w-3 mr-1 text-blue-500" />
                          <p className="text-xs">{day.rainChance}%</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedRegion.weatherAlerts.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-4">Weather Alerts</h3>
                      <div className="space-y-3">
                        {selectedRegion.weatherAlerts.map((alert, index) => (
                          <Alert key={index} variant={alert.type === "alert" ? "destructive" : "default"}>
                            <AlertTriangle className="h-4 w-4" />
                            <AlertTitle>{alert.type === "alert" ? "Critical Alert" : "Warning"}</AlertTitle>
                            <AlertDescription>
                              {alert.message} - {alert.date}
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Insurance</CardTitle>
                    <CardDescription>Parametric insurance policies for this region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedRegion.activeInsurance.length > 0 ? (
                      <div className="space-y-4">
                        {selectedRegion.activeInsurance.map((insurance) => (
                          <div key={insurance.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{insurance.type}</h3>
                              {getStatusBadge(insurance.status)}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                              <div>
                                <p className="text-gray-500">Coverage</p>
                                <p className="font-medium">${insurance.coverage.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Premium</p>
                                <p className="font-medium">${insurance.premium.toLocaleString()}</p>
                              </div>
                            </div>
                            <div className="text-sm mb-2">
                              <p className="text-gray-500">Period</p>
                              <p className="font-medium">
                                {insurance.startDate} to {insurance.endDate}
                              </p>
                            </div>
                            <div className="text-sm">
                              <p className="text-gray-500">Trigger Conditions</p>
                              <p className="font-medium">{insurance.triggers}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">No active insurance policies</div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Add New Insurance</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payout History</CardTitle>
                    <CardDescription>Insurance payouts triggered by weather events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedRegion.payoutHistory.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Event</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedRegion.payoutHistory.map((payout, index) => (
                            <TableRow key={index}>
                              <TableCell>{payout.date}</TableCell>
                              <TableCell>{payout.event}</TableCell>
                              <TableCell>${payout.amount.toLocaleString()}</TableCell>
                              <TableCell>{getStatusBadge(payout.status)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-gray-500">No payout history available</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
