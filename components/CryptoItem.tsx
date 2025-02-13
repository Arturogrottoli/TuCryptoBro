import Image from "next/image"

interface CryptoItemProps {
  crypto: {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    price_change_percentage_24h: number
  }
  onClick: () => void
}

export default function CryptoItem({ crypto, onClick }: CryptoItemProps) {
  return (
    <div
      className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <Image
          src={crypto.image || "/placeholder.svg"}
          alt={crypto.name}
          width={40}
          height={40}
          className="rounded-full border-2 border-gray-600"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-white">{crypto.name}</h2>
          <span className="text-gray-400 text-sm">{crypto.symbol.toUpperCase()}</span>
        </div>
      </div>
      <div className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
        ${crypto.current_price?.toLocaleString(undefined, { maximumFractionDigits: 8 }) ?? "N/A"}
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Rank: {crypto.market_cap_rank ?? "N/A"}</span>
        <span
          className={`font-semibold ${crypto.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}`}
        >
          {crypto.price_change_percentage_24h?.toFixed(2)}%
        </span>
      </div>
    </div>
  )
}

