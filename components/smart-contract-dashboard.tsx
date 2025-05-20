"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, ExternalLink } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for smart contracts
const contracts = [
  {
    id: "contract-001",
    name: "RICE-PH Harvest 2025",
    status: "active",
    progress: 35,
    nextMilestone: "Planting Completion",
    nextPayoutDate: "June 15, 2025",
    nextPayoutAmount: 25000,
    totalInvestment: 100000,
    transactions: [
      {
        date: "May 1, 2025",
        description: "Initial Investment",
        amount: 50000,
        status: "completed",
        txHash: "0x1a2b3c...",
      },
      {
        date: "May 15, 2025",
        description: "Land Preparation",
        amount: 15000,
        status: "completed",
        txHash: "0x4d5e6f...",
      },
    ],
    milestones: [
      { name: "Land Preparation", date: "May 15, 2025", status: "completed", percentage: 15 },
      { name: "Planting Completion", date: "June 15, 2025", status: "pending", percentage: 25 },
      { name: "Growth Monitoring", date: "August 1, 2025", status: "pending", percentage: 20 },
      { name: "Harvest", date: "October 1, 2025", status: "pending", percentage: 40 },
    ],
  },
  {
    id: "contract-002",
    name: "COCONUT-PH Production Q3",
    status: "active",
    progress: 60,
    nextMilestone: "Processing Setup",
    nextPayoutDate: "July 30, 2025",
    nextPayoutAmount: 30000,
    totalInvestment: 150000,
    transactions: [
      {
        date: "April 1, 2025",
        description: "Initial Investment",
        amount: 75000,
        status: "completed",
        txHash: "0x7g8h9i...",
      },
      { date: "May 1, 2025", description: "Farm Expansion", amount: 45000, status: "completed", txHash: "0xj0k1l2..." },
    ],
    milestones: [
      { name: "Farm Expansion", date: "May 1, 2025", status: "completed", percentage: 30 },
      { name: "Tree Maintenance", date: "June 15, 2025", status: "completed", percentage: 30 },
      { name: "Processing Setup", date: "July 30, 2025", status: "pending", percentage: 20 },
      { name: "Market Distribution", date: "September 15, 2025", status: "pending", percentage: 20 },
    ],
  },
  {
    id: "contract-003",
    name: "COFFEE-CO Harvest 2025",
    status: "pending",
    progress: 0,
    nextMilestone: "Initial Funding",
    nextPayoutDate: "June 1, 2025",
    nextPayoutAmount: 40000,
    totalInvestment: 200000,
    transactions: [],
    milestones: [
      { name: "Initial Funding", date: "June 1, 2025", status: "pending", percentage: 20 },
      { name: "Farm Preparation", date: "July 15, 2025", status: "pending", percentage: 20 },
      { name: "Growth Period", date: "December 1, 2025", status: "pending", percentage: 30 },
      { name: "Harvest & Processing", date: "April 1, 2026", status: "pending", percentage: 30 },
    ],
  },
]

export function SmartContractDashboard() {
  const [activeTab, setActiveTab] = useState("active")
  const [selectedContract, setSelectedContract] = useState(contracts[0])

  const filteredContracts =
    activeTab === "all" ? contracts : contracts.filter((contract) => contract.status === activeTab)

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
        <h1 className="text-3xl font-bold">Smart Contract Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your agricultural investments and track contract milestones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>My Contracts</CardTitle>
              <CardDescription>View and manage your active smart contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="mb-6" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                {filteredContracts.map((contract) => (
                  <div
                    key={contract.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedContract.id === contract.id ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedContract(contract)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{contract.name}</h3>
                      {getStatusBadge(contract.status)}
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{contract.progress}%</span>
                      </div>
                      <Progress value={contract.progress} className="h-2" />
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Next: {contract.nextMilestone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedContract && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedContract.name}</CardTitle>
                      <CardDescription>Contract ID: {selectedContract.id}</CardDescription>
                    </div>
                    {getStatusBadge(selectedContract.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Investment</p>
                      <p className="text-xl font-bold">${selectedContract.totalInvestment.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Next Payout</p>
                      <p className="text-xl font-bold">${selectedContract.nextPayoutAmount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{selectedContract.nextPayoutDate}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Progress</p>
                      <p className="text-xl font-bold">{selectedContract.progress}%</p>
                      <Progress value={selectedContract.progress} className="h-2 mt-2" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Milestones</h3>
                    <div className="relative">
                      {/* Vertical line */}
                      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                      {/* Milestones */}
                      <div className="space-y-6">
                        {selectedContract.milestones.map((milestone, index) => (
                          <div key={index} className="relative pl-10">
                            {/* Circle indicator */}
                            <div
                              className={`absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                milestone.status === "completed"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {milestone.status === "completed" ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <Clock className="h-4 w-4" />
                              )}
                            </div>

                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{milestone.name}</h4>
                                <p className="text-sm text-gray-500">{milestone.date}</p>
                              </div>
                              <div className="text-right">
                                <span className="font-medium">{milestone.percentage}%</span>
                                {getStatusBadge(milestone.status)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>All blockchain transactions related to this contract</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedContract.transactions.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Transaction</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedContract.transactions.map((tx, index) => (
                          <TableRow key={index}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.description}</TableCell>
                            <TableCell>${tx.amount.toLocaleString()}</TableCell>
                            <TableCell>{getStatusBadge(tx.status)}</TableCell>
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
                  ) : (
                    <div className="text-center py-8 text-gray-500">No transactions recorded yet</div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
