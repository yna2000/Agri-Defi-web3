"use client"

import { useEffect, useRef } from "react"

export function RegionalPerformanceMap() {
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

    // In a real application, this would be a proper map visualization
    // For this example, we'll create a simplified world map representation

    // Draw background
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw simplified continents
    ctx.fillStyle = "#e2e8f0"

    // North America
    drawContinent(ctx, [
      [100, 100],
      [300, 100],
      [350, 200],
      [300, 300],
      [200, 350],
      [100, 300],
      [50, 200],
    ])

    // South America
    drawContinent(ctx, [
      [200, 350],
      [300, 350],
      [350, 450],
      [300, 550],
      [200, 600],
      [150, 500],
      [150, 400],
    ])

    // Europe and Africa
    drawContinent(ctx, [
      [400, 100],
      [500, 100],
      [550, 200],
      [500, 350],
      [450, 500],
      [350, 550],
      [350, 350],
      [400, 200],
    ])

    // Asia and Australia
    drawContinent(ctx, [
      [550, 150],
      [750, 100],
      [800, 200],
      [750, 300],
      [650, 350],
      [550, 300],
      [500, 200],
    ])

    drawContinent(ctx, [
      [700, 400],
      [800, 400],
      [800, 500],
      [700, 500],
    ])

    // Draw investment locations
    const investments = [
      { name: "Central Luzon, Philippines", x: 700, y: 250, performance: 12.5, risk: "medium" },
      { name: "Bicol Region, Philippines", x: 720, y: 270, performance: 14.2, risk: "high" },
      { name: "Antioquia, Colombia", x: 220, y: 380, performance: 16.8, risk: "low" },
      { name: "Western Region, Ghana", x: 420, y: 350, performance: 15.3, risk: "low" },
      { name: "Michoacán, Mexico", x: 150, y: 280, performance: 18.5, risk: "medium" },
      { name: "Punjab, India", x: 600, y: 230, performance: 11.8, risk: "medium" },
    ]

    // Draw investment markers
    investments.forEach((investment) => {
      // Determine color based on risk level
      let color
      switch (investment.risk) {
        case "low":
          color = "#16a34a"
          break
        case "medium":
          color = "#eab308"
          break
        case "high":
          color = "#dc2626"
          break
        default:
          color = "#3b82f6"
      }

      // Draw marker
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(investment.x, investment.y, 10, 0, Math.PI * 2)
      ctx.fill()

      // Draw performance indicator (size based on performance)
      const performanceRadius = 5 + investment.performance / 5
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(investment.x, investment.y, performanceRadius, 0, Math.PI * 2)
      ctx.fill()

      // Draw label
      ctx.fillStyle = "#1e293b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(investment.name, investment.x, investment.y + 25)

      // Draw performance value
      ctx.fillStyle = "#16a34a"
      ctx.font = "bold 12px sans-serif"
      ctx.fillText(`${investment.performance}%`, investment.x, investment.y + 40)
    })

    // Draw legend
    const legendX = 50
    const legendY = rect.height - 100

    // Risk levels
    ctx.fillStyle = "#1e293b"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Risk Levels:", legendX, legendY)

    // Low risk
    ctx.fillStyle = "#16a34a"
    ctx.beginPath()
    ctx.arc(legendX + 20, legendY + 25, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#1e293b"
    ctx.font = "12px sans-serif"
    ctx.fillText("Low Risk", legendX + 35, legendY + 30)

    // Medium risk
    ctx.fillStyle = "#eab308"
    ctx.beginPath()
    ctx.arc(legendX + 120, legendY + 25, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#1e293b"
    ctx.fillText("Medium Risk", legendX + 135, legendY + 30)

    // High risk
    ctx.fillStyle = "#dc2626"
    ctx.beginPath()
    ctx.arc(legendX + 240, legendY + 25, 8, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = "#1e293b"
    ctx.fillText("High Risk", legendX + 255, legendY + 30)

    // Performance indicator
    ctx.fillStyle = "#1e293b"
    ctx.font = "bold 14px sans-serif"
    ctx.fillText("Performance:", legendX, legendY + 60)
    ctx.font = "12px sans-serif"
    ctx.fillText("Circle size indicates return percentage", legendX + 100, legendY + 60)
  }, [])

  // Helper function to draw a simplified continent shape
  const drawContinent = (ctx: CanvasRenderingContext2D, points: number[][]) => {
    ctx.beginPath()
    ctx.moveTo(points[0][0], points[0][1])

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1])
    }

    ctx.closePath()
    ctx.fill()
  }

  return <canvas ref={canvasRef} className="w-full h-full" />
}
