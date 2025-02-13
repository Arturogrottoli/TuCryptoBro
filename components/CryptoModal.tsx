"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { XMarkIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import CryptoChart from "./CryptoChart"

interface CryptoModalProps {
  crypto: {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    price_change_percentage_24h: number
    high_24h: number
    low_24h: number
  }
  onClose: () => void
}

export default function CryptoModal({ crypto, onClose }: CryptoModalProps) {
  const [timeRange, setTimeRange] = useState("1")
  const [historicalData, setHistoricalData] = useState<[number, number][]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart`, {
          params: {
            vs_currency: "usd",
            days: timeRange,
          },
        })
        setHistoricalData(response.data.prices)
      } catch (error) {
        console.error("Error fetching historical data:", error)
        setError("Failed to load historical data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistoricalData()
  }, [crypto.id, timeRange])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-lg w-full max-w-4xl mx-auto p-6 relative overflow-y-auto max-h-[90vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none transition-colors duration-200"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="flex items-center mb-6">
          <Image
            src={crypto.image || "/placeholder.svg"}
            alt={crypto.name}
            width={64}
            height={64}
            className="rounded-full border-2 border-gray-600"
          />
          <div className="ml-4">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
              {crypto.name}
            </h2>
            <span className="text-gray-400 text-lg">{crypto.symbol.toUpperCase()}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Current Price</p>
            <p className="text-2xl font-bold text-green-400">
              ${crypto.current_price?.toLocaleString(undefined, { maximumFractionDigits: 8 }) ?? "N/A"}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">Market Cap</p>
            <p className="text-2xl font-bold text-blue-400">${crypto.market_cap?.toLocaleString() ?? "N/A"}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">24h High</p>
            <p className="text-xl font-semibold text-green-400">
              ${crypto.high_24h?.toLocaleString(undefined, { maximumFractionDigits: 8 }) ?? "N/A"}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400">24h Low</p>
            <p className="text-xl font-semibold text-red-400">
              ${crypto.low_24h?.toLocaleString(undefined, { maximumFractionDigits: 8 }) ?? "N/A"}
            </p>
          </div>
        </div>
        <div className="mb-6">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="block w-full px-4 py-2 text-base bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
          >
            <option value="1">24 Hours</option>
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="365">1 Year</option>
          </select>
        </div>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading chart data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <CryptoChart data={historicalData} />
        )}
      </div>
    </div>
  )
}

