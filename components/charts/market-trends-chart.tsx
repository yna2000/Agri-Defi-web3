"use client"

import { useEffect, useRef } from "react"

interface MarketTrendsChartProps {
  timeRange?: string
}

export function MarketTrendsChart({ timeRange = "1y" }: MarketTrendsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Chart dimensions
    const padding = 50
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2

    // Generate data based on timeRange
    const dataPoints = timeRange === "1m" ? 30 : timeRange === "3m" ? 90 : timeRange === "6m" ? 180 : 365

    // Generate data for multiple commodities
    const commodities = [
      { name: "Rice", color: "#16a34a", data: generateCommodityData(dataPoints, 400, 600) },
      { name: "Coffee", color: "#b45309", data: generateCommodityData(dataPoints, 300, 500) },
      { name: "Coconut", color: "#2563eb", data: generateCommodityData(dataPoints, 200, 350) },
      { name: "Cacao", color: "#7c2d12", data: generateCommodityData(dataPoints, 250, 400) },
      { name: "Avocado", color: "#65a30d", data: generateCommodityData(dataPoints, 500, 700) },
    ]

    // Find min and max values across all commodities
    let minValue = Number.MAX_VALUE
    let maxValue = Number.MIN_VALUE

    commodities.forEach((commodity) => {
      const commodityMin = Math.min(...commodity.data)
      const commodityMax = Math.max(...commodity.data)

      if (commodityMin < minValue) minValue = commodityMin
      if (commodityMax > maxValue) maxValue = commodityMax
    })

    // Add some padding to min and max
    minValue = minValue * 0.9
    maxValue = maxValue * 1.1

    // Draw axes
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, padding + chartHeight)
    ctx.lineTo(padding + chartWidth, padding + chartHeight)
    ctx.stroke()

    // Draw y-axis labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "right"
    const yLabelCount = 5
    for (let i = 0; i <= yLabelCount; i++) {
      const value = minValue + ((maxValue - minValue) * (yLabelCount - i)) / yLabelCount
      const y = padding + (chartHeight * i) / yLabelCount
      ctx.fillText(`$${value.toFixed(0)}`, padding - 10, y + 4)
    }

    // Draw x-axis labels
    ctx.textAlign = "center"
    const xLabelCount = timeRange === "1m" ? 4 : timeRange === "3m" ? 3 : timeRange === "6m" ? 6 : 12
    for (let i = 0; i <= xLabelCount; i++) {
      const x = padding + (chartWidth * i) / xLabelCount
      const labelText =
        timeRange === "1m"
          ? `Week ${i + 1}`
          : timeRange === "3m"
            ? `Month ${i + 1}`
            : timeRange === "6m"
              ? `Month ${i + 1}`
              : `Month ${i + 1}`
      ctx.fillText(labelText, x, padding + chartHeight + 20)
    }

    // Draw data lines for each commodity
    commodities.forEach((commodity) => {
      ctx.strokeStyle = commodity.color
      ctx.lineWidth = 2
      ctx.beginPath()

      commodity.data.forEach((value, index) => {
        const x = padding + (chartWidth * index) / (commodity.data.length - 1)
        const y = padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()
    })

    // Draw legend
    const legendX = padding
    const legendY = padding - 30
    const legendItemWidth = 80

    commodities.forEach((commodity, index) => {
      const x = legendX + index * legendItemWidth

      // Draw color line
      ctx.strokeStyle = commodity.color
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(x, legendY + 7.5)
      ctx.lineTo(x + 20, legendY + 7.5)
      ctx.stroke()

      // Draw label
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(commodity.name, x + 25, legendY + 7.5)
    })
  }, [timeRange])

  // Generate mock data
  const generateCommodityData = (count: number, min: number, max: number) => {
    const data = []
    let value = min + Math.random() * (max - min) * 0.5

    for (let i = 0; i < count; i++) {
      // Add some randomness with seasonal patterns
      const seasonalFactor = Math.sin((i / count) * Math.PI * 2) * (max - min) * 0.1
      const change = (Math.random() - 0.5) * (max - min) * 0.05 + seasonalFactor

      value += change
      if (value < min) value = min + Math.random() * (max - min) * 0.1
      if (value > max) value = max - Math.random() * (max - min) * 0.1

      data.push(value)
    }

    return data
  }

  return <canvas ref={canvasRef} className="w-full h-full" />
}
