"use client"

import { useEffect, useRef } from "react"

interface InvestmentPerformanceChartProps {
  timeRange?: string
}

export function InvestmentPerformanceChart({ timeRange = "1y" }: InvestmentPerformanceChartProps) {
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
    const padding = 40
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2

    // Generate data based on timeRange
    const dataPoints = timeRange === "1m" ? 30 : timeRange === "3m" ? 90 : timeRange === "6m" ? 180 : 365
    const data = generatePerformanceData(dataPoints)

    // Find min and max values
    const minValue = Math.min(...data) * 0.95
    const maxValue = Math.max(...data) * 1.05

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
      ctx.fillText(`$${value.toFixed(2)}`, padding - 10, y + 4)
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

    // Draw data line
    ctx.strokeStyle = "#16a34a"
    ctx.lineWidth = 2
    ctx.beginPath()
    data.forEach((value, index) => {
      const x = padding + (chartWidth * index) / (data.length - 1)
      const y = padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Draw area under the line
    ctx.fillStyle = "rgba(22, 163, 74, 0.1)"
    ctx.beginPath()
    data.forEach((value, index) => {
      const x = padding + (chartWidth * index) / (data.length - 1)
      const y = padding + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.lineTo(padding + chartWidth, padding + chartHeight)
    ctx.lineTo(padding, padding + chartHeight)
    ctx.closePath()
    ctx.fill()

    // Draw data points
    const pointInterval = Math.max(1, Math.floor(data.length / 12))
    ctx.fillStyle = "#16a34a"
    for (let i = 0; i < data.length; i += pointInterval) {
      const x = padding + (chartWidth * i) / (data.length - 1)
      const y = padding + chartHeight - ((data[i] - minValue) / (maxValue - minValue)) * chartHeight
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [timeRange])

  // Generate mock data
  const generatePerformanceData = (count: number) => {
    const data = []
    let value = 1000 + Math.random() * 500
    for (let i = 0; i < count; i++) {
      // Add some randomness but with an overall upward trend
      const change = (Math.random() - 0.3) * 50
      value += change
      if (value < 800) value = 800 + Math.random() * 100
      data.push(value)
    }
    return data
  }

  return <canvas ref={canvasRef} className="w-full h-full" />
}
