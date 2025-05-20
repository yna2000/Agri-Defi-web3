"use client"

import { useEffect, useRef } from "react"

export function TokenDistributionChart() {
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

    // Data for the pie chart
    const data = [
      { name: "RICE-PH", value: 625, color: "#16a34a" },
      { name: "COCONUT-PH", value: 1125, color: "#2563eb" },
      { name: "COFFEE-CO", value: 510, color: "#b45309" },
      { name: "CACAO-GH", value: 320, color: "#7c2d12" },
      { name: "AVOCADO-MX", value: 1250, color: "#65a30d" },
      { name: "WHEAT-IN", value: 750, color: "#d97706" },
    ]

    const total = data.reduce((sum, item) => sum + item.value, 0)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Draw the pie chart
    let startAngle = 0
    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total

      ctx.fillStyle = item.color
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()
      ctx.fill()

      // Draw slice border
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Calculate position for the label
      const labelAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + labelRadius * Math.cos(labelAngle)
      const labelY = centerY + labelRadius * Math.sin(labelAngle)

      // Draw percentage label if slice is big enough
      if (item.value / total > 0.05) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 14px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(`${Math.round((item.value / total) * 100)}%`, labelX, labelY)
      }

      startAngle += sliceAngle
    })

    // Draw legend
    const legendX = rect.width - 120
    const legendY = 20
    const legendItemHeight = 25

    data.forEach((item, index) => {
      const y = legendY + index * legendItemHeight

      // Draw color box
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, y, 15, 15)

      // Draw label
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"
      ctx.fillText(item.name, legendX + 25, y + 7.5)
    })
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
