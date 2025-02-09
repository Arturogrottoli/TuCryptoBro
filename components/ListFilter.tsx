interface ListFilterProps {
  count: number
  setCount: (count: number) => void
  sortBy: string
  onSortChange: (sortBy: string) => void
}

export default function ListFilter({ count, setCount, sortBy, onSortChange }: ListFilterProps) {
  return (
    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="mb-2 md:mb-0">
        <label htmlFor="cryptoCount" className="block text-sm font-medium text-gray-300 mb-1">
          Show cryptocurrencies:
        </label>
        <select
          id="cryptoCount"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortBy" className="block text-sm font-medium text-gray-300 mb-1">
          Sort by:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="market_cap_desc">Market Cap (High to Low)</option>
          <option value="market_cap_asc">Market Cap (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
          <option value="price_asc">Price (Low to High)</option>
          <option value="price_change_24h_desc">24h Change (High to Low)</option>
          <option value="price_change_24h_asc">24h Change (Low to High)</option>
        </select>
      </div>
    </div>
  )
}

