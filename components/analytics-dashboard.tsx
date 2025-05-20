"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar, Download, Share2, RefreshCw, Leaf, Droplets, Sun, Wind } from "lucide-react"
import { InvestmentPerformanceChart } from "@/components/charts/investment-performance-chart"
import { TokenDistributionChart } from "@/components/charts/token-distribution-chart"
import { YieldForecastChart } from "@/components/charts/yield-forecast-chart"
import { MarketTrendsChart } from "@/components/charts/market-trends-chart"
import { ImpactMetricsChart } from "@/components/charts/impact-metrics-chart"
import { RegionalPerformanceMap } from "@/components/charts/regional-performance-map"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("1y")
  const [lastUpdated, setLastUpdated] = useState("May 21, 2025, 10:30 AM")

  const refreshData = () => {
    // In a real app, this would fetch fresh data
    const now = new Date()
    setLastUpdated(
      `${now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}, ${now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`,
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into your agricultural investments</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Last updated: <span className="font-medium">{lastUpdated}</span>
          </div>
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Portfolio Value</CardDescription>
            <CardTitle className="text-3xl">$4,580.00</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">+12.5%</span>
              <span className="text-gray-500 text-sm ml-2">vs. last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Annual Yield</CardDescription>
            <CardTitle className="text-3xl">14.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">+2.3%</span>
              <span className="text-gray-500 text-sm ml-2">vs. last year</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Investments</CardDescription>
            <CardTitle className="text-3xl">6</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">4 Tokens</Badge>
              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">2 Staked</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Environmental Impact</CardDescription>
            <CardTitle className="text-3xl">+45%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-green-600">
              <Leaf className="h-4 w-4 mr-1" />
              <span className="font-medium">Sustainability Score</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="mb-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="market">Market Trends</TabsTrigger>
          <TabsTrigger value="forecast">Yield Forecast</TabsTrigger>
          <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Investment Performance</CardTitle>
                  <CardDescription>Track your portfolio performance over time</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <InvestmentPerformanceChart timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Distribution</CardTitle>
                <CardDescription>Breakdown of your token holdings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <TokenDistributionChart />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Tokens</CardTitle>
                <CardDescription>Your best investments by return</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-green-800">AV</span>
                      </div>
                      <div>
                        <div className="font-medium">AVOCADO-MX</div>
                        <div className="text-sm text-gray-500">Michoacán, Mexico</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+18.5%</div>
                      <div className="text-sm text-gray-500">$180,000 raised</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-amber-800">CO</span>
                      </div>
                      <div>
                        <div className="font-medium">COFFEE-CO</div>
                        <div className="text-sm text-gray-500">Antioquia, Colombia</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+16.8%</div>
                      <div className="text-sm text-gray-500">$85,000 raised</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-brown-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-yellow-800">CA</span>
                      </div>
                      <div>
                        <div className="font-medium">CACAO-GH</div>
                        <div className="text-sm text-gray-500">Western Region, Ghana</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+15.3%</div>
                      <div className="text-sm text-gray-500">$60,000 raised</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-blue-800">CO</span>
                      </div>
                      <div>
                        <div className="font-medium">COCONUT-PH</div>
                        <div className="text-sm text-gray-500">Bicol Region, Philippines</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+14.2%</div>
                      <div className="text-sm text-gray-500">$120,000 raised</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="market" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Agricultural Commodity Trends</CardTitle>
                  <CardDescription>Market prices for key agricultural commodities</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="price">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price">Market Price</SelectItem>
                      <SelectItem value="volume">Trading Volume</SelectItem>
                      <SelectItem value="volatility">Price Volatility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <MarketTrendsChart timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>Key trends affecting agricultural markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4 py-1">
                    <h4 className="font-medium">Rice Prices Stabilizing</h4>
                    <p className="text-sm text-gray-600">
                      After a period of volatility, global rice prices are showing signs of stabilization due to
                      improved harvests in key producing regions.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4 py-1">
                    <h4 className="font-medium">Coffee Demand Rising</h4>
                    <p className="text-sm text-gray-600">
                      Specialty coffee demand continues to grow, with premium prices for high-quality beans from
                      sustainable sources.
                    </p>
                  </div>

                  <div className="border-l-4 border-amber-500 pl-4 py-1">
                    <h4 className="font-medium">Coconut Products Expanding</h4>
                    <p className="text-sm text-gray-600">
                      The market for coconut-based products is diversifying beyond traditional offerings, creating new
                      value streams for producers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Alerts</CardTitle>
                <CardDescription>Significant price movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <div>
                      <div className="font-medium">AVOCADO-MX</div>
                      <div className="text-sm text-gray-600">Price increase</div>
                    </div>
                    <div className="text-green-600 font-medium">+5.2%</div>
                  </div>

                  <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                    <div>
                      <div className="font-medium">WHEAT-IN</div>
                      <div className="text-sm text-gray-600">Price decrease</div>
                    </div>
                    <div className="text-red-600 font-medium">-2.8%</div>
                  </div>

                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <div>
                      <div className="font-medium">COFFEE-CO</div>
                      <div className="text-sm text-gray-600">Price increase</div>
                    </div>
                    <div className="text-green-600 font-medium">+3.7%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Calendar</CardTitle>
                <CardDescription>Upcoming events affecting markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="bg-blue-100 text-blue-800 h-12 w-12 rounded-lg flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-medium">JUN</span>
                      <span className="text-lg font-bold">15</span>
                    </div>
                    <div>
                      <h4 className="font-medium">USDA Crop Report</h4>
                      <p className="text-sm text-gray-600">
                        Monthly report on global agricultural production and forecasts
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-blue-100 text-blue-800 h-12 w-12 rounded-lg flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-medium">JUL</span>
                      <span className="text-lg font-bold">05</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Coffee Harvest Begins</h4>
                      <p className="text-sm text-gray-600">Start of main coffee harvest season in Colombia</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-blue-100 text-blue-800 h-12 w-12 rounded-lg flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-medium">JUL</span>
                      <span className="text-lg font-bold">22</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Agricultural Policy Forum</h4>
                      <p className="text-sm text-gray-600">
                        International conference on sustainable agriculture policies
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Yield Forecast</CardTitle>
                  <CardDescription>Projected yields for your agricultural investments</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Crop Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Crops</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="coconut">Coconut</SelectItem>
                      <SelectItem value="coffee">Coffee</SelectItem>
                      <SelectItem value="cacao">Cacao</SelectItem>
                      <SelectItem value="avocado">Avocado</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <YieldForecastChart />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Climate Factors</CardTitle>
                <CardDescription>Weather conditions affecting crop yields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Droplets className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Rainfall</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Favorable
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Sun className="h-5 w-5 mr-2 text-amber-500" />
                      <span>Temperature</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Moderate Risk
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Wind className="h-5 w-5 mr-2 text-blue-500" />
                      <span>Wind Patterns</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Favorable
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                      <span>Growing Season</span>
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        On Schedule
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yield Projections</CardTitle>
                <CardDescription>Expected yields by crop type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Rice (RICE-PH)</span>
                      <span className="text-sm text-green-600">+8% vs. last year</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">5.2 tons/hectare (expected)</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Coconut (COCONUT-PH)</span>
                      <span className="text-sm text-green-600">+5% vs. last year</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">15,000 nuts/hectare (expected)</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Coffee (COFFEE-CO)</span>
                      <span className="text-sm text-yellow-600">-2% vs. last year</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">1,800 kg/hectare (expected)</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cacao (CACAO-GH)</span>
                      <span className="text-sm text-green-600">+10% vs. last year</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">800 kg/hectare (expected)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Factors that may impact yields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800 flex items-center">
                      <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      High Risk: Typhoon Season
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Potential typhoons in the Philippines could affect rice and coconut harvests in Q3.
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 flex items-center">
                      <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                      Medium Risk: Coffee Rust
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Monitoring for coffee leaf rust in Colombia, currently contained but requires vigilance.
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 flex items-center">
                      <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      Low Risk: Water Supply
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Water reservoirs at adequate levels for irrigation needs across most regions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Environmental & Social Impact</CardTitle>
                  <CardDescription>Measuring the sustainability impact of your investments</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="environmental">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Impact Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="environmental">Environmental</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="economic">Economic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ImpactMetricsChart />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>Sustainability metrics for your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Water Usage Reduction</span>
                      <span className="text-sm text-green-600">-35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Through efficient irrigation systems</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Carbon Sequestration</span>
                      <span className="text-sm text-green-600">+28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Through agroforestry practices</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Biodiversity Improvement</span>
                      <span className="text-sm text-green-600">+42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Increased species diversity on farms</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Chemical Input Reduction</span>
                      <span className="text-sm text-green-600">-45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Through organic farming practices</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Impact</CardTitle>
                <CardDescription>Community benefits from your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Jobs Created</span>
                      <span className="text-sm text-green-600">56</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Direct employment on farms</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Farmer Income Growth</span>
                      <span className="text-sm text-green-600">+58%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "88%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Average increase across all farms</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Women Empowerment</span>
                      <span className="text-sm text-green-600">+45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Increased participation in decision-making</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Education Access</span>
                      <span className="text-sm text-green-600">+32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "62%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Children attending school from farm families</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Economic Impact</CardTitle>
                <CardDescription>Financial benefits beyond direct returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Local Economic Growth</span>
                      <span className="text-sm text-green-600">+25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Increased economic activity in farm regions</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Value Chain Development</span>
                      <span className="text-sm text-green-600">+40%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Growth in processing and distribution</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Market Access</span>
                      <span className="text-sm text-green-600">+65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Farmers with direct market connections</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Financial Inclusion</span>
                      <span className="text-sm text-green-600">+52%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Farmers with access to financial services</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Regional Performance Map</CardTitle>
                  <CardDescription>Geographic distribution of your investments and their performance</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="yield">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="View By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yield">Yield Performance</SelectItem>
                      <SelectItem value="return">Financial Return</SelectItem>
                      <SelectItem value="risk">Climate Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <RegionalPerformanceMap />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Regions</CardTitle>
                <CardDescription>Areas with highest investment returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-green-800">1</span>
                      </div>
                      <div>
                        <div className="font-medium">Michoacán, Mexico</div>
                        <div className="text-sm text-gray-500">Avocado</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">+18.5%</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-green-800">2</span>
                      </div>
                      <div>
                        <div className="font-medium">Antioquia, Colombia</div>
                        <div className="text-sm text-gray-500">Coffee</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">+16.8%</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-green-800">3</span>
                      </div>
                      <div>
                        <div className="font-medium">Western Region, Ghana</div>
                        <div className="text-sm text-gray-500">Cacao</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-medium">+15.3%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Risk Assessment</CardTitle>
                <CardDescription>Climate and market risks by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Central Luzon, Philippines</div>
                      <div className="text-sm text-gray-500">Rice</div>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                      Medium Risk
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Bicol Region, Philippines</div>
                      <div className="text-sm text-gray-500">Coconut</div>
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      High Risk
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Antioquia, Colombia</div>
                      <div className="text-sm text-gray-500">Coffee</div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Low Risk
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Western Region, Ghana</div>
                      <div className="text-sm text-gray-500">Cacao</div>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Low Risk
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Diversification Analysis</CardTitle>
                <CardDescription>Geographic spread of your investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Asia</span>
                      <span className="text-sm">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Philippines, India</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Americas</span>
                      <span className="text-sm">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Colombia, Mexico</div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Africa</span>
                      <span className="text-sm">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Ghana</div>
                  </div>

                  <div className="pt-2">
                    <div className="text-sm font-medium mb-2">Diversification Score</div>
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                      <span className="text-sm font-medium">75/100</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Good geographic diversification</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
