import { Search, SlidersHorizontal } from 'lucide-react'
import { useDebounce } from '../hooks'
import { useState, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilterToggle?: () => void
  placeholder?: string
}

export function SearchBar({ onSearch, onFilterToggle, placeholder = 'Search community tasks...' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    onSearch(debouncedQuery)
  }, [debouncedQuery, onSearch])

  return (
    <div className="flex gap-2">
      <div className="flex-1 relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-sorowork-purple/50 transition-colors"
        />
      </div>
      {onFilterToggle && (
        <button
          onClick={onFilterToggle}
          className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
        >
          <SlidersHorizontal size={16} className="text-white/50" />
        </button>
      )}
    </div>
  )
}
