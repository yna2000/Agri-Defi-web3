import { CircularProgress } from "@mui/material"

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <CircularProgress size={80} thickness={5} style={{ color: "#16a34a" }} />
      <p className="mt-6 text-2xl font-semibold text-gray-800">Loading AgriDeFi...</p>
    </div>
  )
}
