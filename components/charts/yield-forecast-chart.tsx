"use client"

import { useEffect, useRef } from "react"

export function YieldForecastChart() {
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

    // Data for the chart
    const data = [
      { crop: "Rice", lastYear: 4.8, forecast: 5.2, unit: "tons/ha" },
      { crop: "Coconut", lastYear: 14000, forecast: 15000, unit: "nuts/ha" },
      { crop: "Coffee", lastYear: 1850, forecast: 1800, unit: "kg/ha" },
      { crop: "Cacao", lastYear: 720, forecast: 800, unit: "kg/ha" },
      { crop: "Avocado", lastYear: 9.5, forecast: 10, unit: "tons/ha" },
      { crop: "Wheat", lastYear: 4.2, forecast: 4.5, unit: "tons/ha" },
    ]

    // Calculate bar width and spacing
    const barCount = data.length
    const barWidth = (chartWidth / barCount) * 0.35
    const groupWidth = barWidth * 2 + 10
    const groupSpacing = (chartWidth - groupWidth * barCount) / (barCount + 1)

    // Find max value for scaling
    const maxValue = Math.max(...data.map((item) => Math.max(item.lastYear, item.forecast))) * 1.2

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
      const value = (maxValue * (yLabelCount - i)) / yLabelCount
      const y = padding + (chartHeight * i) / yLabelCount
      ctx.fillText(`${value.toFixed(0)}`, padding - 10, y + 4)
    }

    // Draw bars and labels
    data.forEach((item, index) => {
      const groupX = padding + groupSpacing + index * (groupWidth + groupSpacing)

      // Last year bar
      ctx.fillStyle = "#94a3b8"
      const lastYearHeight = (item.lastYear / maxValue) * chartHeight
      const lastYearY = padding + chartHeight - lastYearHeight
      ctx.fillRect(groupX, lastYearY, barWidth, lastYearHeight)

      // Forecast bar
      ctx.fillStyle = "#16a34a"
      const forecastHeight = (item.forecast / maxValue) * chartHeight
      const forecastY = padding + chartHeight - forecastHeight
      ctx.fillRect(groupX + barWidth + 10, forecastY, barWidth, forecastHeight)

      // Crop label
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.crop, groupX + barWidth + 5, padding + chartHeight + 20)

      // Value labels
      ctx.fillStyle = "#ffffff"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"

      // Only show value if bar is tall enough
      if (lastYearHeight > 20) {
        ctx.fillText(item.lastYear.toString(), groupX + barWidth / 2, lastYearY + lastYearHeight / 2 + 4)
      }

      if (forecastHeight > 20) {
        ctx.fillText(
          item.forecast.toString(),
          groupX + barWidth + 10 + barWidth / 2,
          forecastY + forecastHeight / 2 + 4,
        )
      }
    })

    // Draw legend
    const legendX = padding
    const legendY = padding - 30

    // Last year box
    ctx.fillStyle = "#94a3b8"
    ctx.fillRect(legendX, legendY, 15, 15)

    // Last year label
    ctx.fillStyle = "#374151"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Last Year", legendX + 25, legendY + 7.5)

    // Forecast box
    ctx.fillStyle = "#16a34a"
    ctx.fillRect(legendX + 100, legendY, 15, 15)

    // Forecast label
    ctx.fillStyle = "#374151"
    ctx.fillText("Forecast", legendX + 125, legendY + 7.5)
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
