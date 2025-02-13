"use client"

import { LineChart, Line, ResponsiveContainer } from "recharts"

interface CryptoProps {
  crypto: {
    name: string
    symbol: string
    price: string
    price_change_pct_24h: string
  }
}

export function CryptoCard({ crypto }: CryptoProps) {
  const priceChange = Number.parseFloat(crypto.price_change_pct_24h)
  const data = [
    { price: Number.parseFloat(crypto.price) * 0.9 },
    { price: Number.parseFloat(crypto.price) },
    { price: Number.parseFloat(crypto.price) * 1.1 },
  ]

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{crypto.name}</h2>
      <p className="text-gray-400 mb-4">{crypto.symbol}</p>
      <p className="text-3xl font-semibold mb-2">${Number.parseFloat(crypto.price).toFixed(2)}</p>
      <p className={`text-lg mb-4 ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
        {priceChange >= 0 ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
      </p>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="price"
              stroke={priceChange >= 0 ? "#10B981" : "#EF4444"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

