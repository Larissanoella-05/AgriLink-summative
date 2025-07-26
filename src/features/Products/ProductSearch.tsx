"use client"

import { useState, useEffect } from "react"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Search, X } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ProductsSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function ProductsSearch({ searchQuery, onSearchChange }: ProductsSearchProps) {
  const { t } = useTranslation()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, onSearchChange])

  const handleClear = () => {
    setLocalQuery("")
    onSearchChange("")
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t("searchProducts") || "Search products..."}
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {localQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {localQuery && (
        <div className="absolute top-full left-0 right-0 mt-1 text-sm text-muted-foreground">
          {t("searchingFor", { query: localQuery }) || `Searching for "${localQuery}"`}
        </div>
      )}
    </div>
  )
}
