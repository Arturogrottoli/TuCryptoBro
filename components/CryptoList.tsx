"use client"

import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import CryptoItem from "./CryptoItem"
import CryptoModal from "./CryptoModal"
import ListFilter from "./ListFilter"

interface Crypto {
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

export default function CryptoList() {
  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [visibleCount, setVisibleCount] = useState(20)
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null)
  const [sortBy, setSortBy] = useState("market_cap_desc")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
    setVisibleCount(20)
  }

  useEffect(() => {
    const fetchCryptos = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc", // Siempre ordenamos por capitalización de mercado descendente
            per_page: 250, // Aumentamos el número de resultados
            page: 1,
            sparkline: false,
          },
        })
        setCryptos(response.data)
      } catch (error) {
        console.error("Error fetching crypto data:", error)
        setError("Failed to load cryptocurrency data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCryptos()
  }, []) // Removemos sortBy de las dependencias

  const sortedCryptos = useMemo(() => {
    const sorted = [...cryptos]
    switch (sortBy) {
      case "price_desc":
        sorted.sort((a, b) => b.current_price - a.current_price)
        break
      case "price_asc":
        sorted.sort((a, b) => a.current_price - b.current_price)
        break
      case "market_cap_asc":
        sorted.sort((a, b) => a.market_cap - b.market_cap)
        break
      case "name_asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name_desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name))
        break
      default: // market_cap_desc
        sorted.sort((a, b) => b.market_cap - a.market_cap)
    }
    return sorted
  }, [cryptos, sortBy])

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 rounded-lg shadow-xl">
      <ListFilter count={visibleCount} setCount={setVisibleCount} sortBy={sortBy} onSortChange={handleSortChange} />
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading cryptocurrencies...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedCryptos.slice(0, visibleCount).map((crypto) => (
            <CryptoItem key={crypto.id} crypto={crypto} onClick={() => setSelectedCrypto(crypto)} />
          ))}
        </div>
      )}
      {selectedCrypto && <CryptoModal crypto={selectedCrypto} onClose={() => setSelectedCrypto(null)} />}
    </div>
  )
}

