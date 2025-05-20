"use client"

import { useEffect, useRef } from "react"

export function ImpactMetricsChart() {
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
    const padding = 60
    const chartWidth = rect.width - padding * 2
    const chartHeight = rect.height - padding * 2
    const centerX = padding + chartWidth / 2
    const centerY = padding + chartHeight / 2
    const radius = Math.min(chartWidth, chartHeight) / 2

    // Data for the radar chart
    const metrics = [
      { name: "Water Conservation", value: 85, color: "#3b82f6" },
      { name: "Carbon Reduction", value: 72, color: "#16a34a" },
      { name: "Biodiversity", value: 90, color: "#65a30d" },
      { name: "Soil Health", value: 78, color: "#b45309" },
      { name: "Farmer Income", value: 88, color: "#7c3aed" },
      { name: "Community Impact", value: 82, color: "#ec4899" },
    ]

    const angleStep = (Math.PI * 2) / metrics.length

    // Draw axis lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    metrics.forEach((_, i) => {
      const angle = i * angleStep - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
      ctx.stroke()
    })

    // Draw concentric circles
    const circleCount = 5
    for (let i = 1; i <= circleCount; i++) {
      const circleRadius = (radius * i) / circleCount
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2)
      ctx.stroke()

      // Draw scale labels
      const scaleValue = (100 * i) / circleCount
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.fillText(`${scaleValue}`, centerX - circleRadius - 5, centerY)
    }

    // Draw data points and connect them
    ctx.strokeStyle = "rgba(22, 163, 74, 0.7)"
    ctx.fillStyle = "rgba(22, 163, 74, 0.2)"
    ctx.lineWidth = 2
    ctx.beginPath()

    metrics.forEach((metric, i) => {
      const angle = i * angleStep - Math.PI / 2
      const pointRadius = (radius * metric.value) / 100
      const x = centerX + Math.cos(angle) * pointRadius
      const y = centerY + Math.sin(angle) * pointRadius

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    // Close the path
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

    // Draw data points
    metrics.forEach((metric, i) => {
      const angle = i * angleStep - Math.PI / 2
      const pointRadius = (radius * metric.value) / 100
      const x = centerX + Math.cos(angle) * pointRadius
      const y = centerY + Math.sin(angle) * pointRadius

      ctx.fillStyle = metric.color
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()

      // Draw metric labels
      ctx.fillStyle = "#374151"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"

      const labelRadius = radius + 20
      const labelX = centerX + Math.cos(angle) * labelRadius
      const labelY = centerY + Math.sin(angle) * labelRadius

      ctx.fillText(metric.name, labelX, labelY)

      // Draw value labels
      const valueRadius = pointRadius + 15
      const valueX = centerX + Math.cos(angle) * valueRadius
      const valueY = centerY + Math.sin(angle) * valueRadius

      ctx.fillStyle = "#16a34a"
      ctx.font = "bold 12px sans-serif"
      ctx.fillText(`${metric.value}%`, valueX, valueY)
    })
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
